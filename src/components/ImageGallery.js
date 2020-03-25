// @flow
import React from 'react'
import s from './ImageGallery.module.css'
import type { Photo } from '../types'

type Props = {
  photos: Photo[]
}

export default ({ photos }: Props) => (
  <div className={s.gallery}>
    {
      photos.map(photo => (
        <img
          key={photo.id}
          src={photo.source}
          alt=''
        />
      ))
    }
  </div>
)
