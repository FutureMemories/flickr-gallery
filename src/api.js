// @flow
import type { Photo } from './types'
import memoizedJsonFetch from './utils/memoizedJsonFetch'

const API_KEY = 'c14e3665c8287da0ba6d514b0f56e06e'

const mapPhotoUrl = (photo: { id: string, url_m?: string, url_o: string }): Photo => ({
  id: photo.id,
  source: photo.url_m || photo.url_o
})

export const getPhotos = (page: number, query?: string): Promise<Photo[]> => {
  const params = new URLSearchParams('method=flickr.photos.search&tags=sports&safe_search=1&content_type=1&extras=url_m,url_o&format=json&nojsoncallback=1&is_commons=true&per_page=20')

  params.append('api_key', API_KEY)
  params.append('page', `${page}`)

  if (query) {
    params.append('text', query)
  }

  return (
    memoizedJsonFetch(`https://www.flickr.com/services/rest/?${params.toString()}`)
      .then(data => (
        data.photos.photo.map(mapPhotoUrl)
      ))
  )
}
