// @flow
import React, { useEffect, useState, useCallback } from 'react'
import s from './App.module.css'
import ImageGallery from './components/ImageGallery'
import Header from './components/Header'
import Loader from './components/Loader'
import useOnScrolledToBottom from './hooks/useOnScrolledToBottom'
import { getPhotos } from './api'
import type { Photo } from './types'

export default () => {
  const [photos, setPhotos] = useState<Photo[]>([])
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [page, setPage] = useState(1)

  const onQuery = useCallback(q => {
    setPhotos([])
    setPage(1)
    setQuery(q)
  }, [])

  useEffect(() => {
    setLoading(true)

    getPhotos(page, query)
      .then(list => {
        if (page === 1) {
          setPhotos(list)
        } else {
          setPhotos(existing => existing.concat(list))
        }
      })
      .catch(() => setError(true))
      .then(() => setLoading(false))
  }, [page, query])

  useOnScrolledToBottom(
    useCallback(() => {
      if (!loading) {
        setPage(p => p + 1)
      }
    }, [loading])
  )

  return (
    <div className={s.app}>
      <Header onQuery={onQuery} />
      {
        error && (
          <p className={s.error}>
            Error loading gallery. Try refreshing.
          </p>
        )
      }
      {
        (!error && !loading && photos.length === 0) && (
          <p className={s.error}>
            No photos found for query: {query}.
          </p>
        )
      }
      {
        photos.length > 0 && (
          <ImageGallery
            photos={photos}
          />
        )
      }
      {loading && <Loader />}
    </div>
  )
}
