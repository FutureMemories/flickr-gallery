// @flow
import React, { useEffect, useState } from 'react'
import s from './Loader.module.css'

export default () => {
  const [showSlowWarning, setShowSlowWarning] = useState(false)

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowSlowWarning(true)
    }, 5000)

    return () => clearTimeout(timeout)
  }, [])

  return (
    <p className={s.loader}>
      Loading...
      {
        showSlowWarning && (
          <em>(It looks like you have a slow internet connection, please be patient...)</em>
        )
      }
    </p>
  )
}
