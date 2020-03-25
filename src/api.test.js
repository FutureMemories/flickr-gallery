/* eslint-env jest */
import { getPhotos } from './api'

describe('getPhotos', () => {
  test('returns photos with id and source', async () => {
    fetch.mockResponses(
      JSON.stringify({
        photos: {
          photo: [
            { id: 'id1', url_m: 'https://photo1.png', url_o: 'https://photo1o.png' },
            { id: 'id2', url_m: 'https://photo2.png', url_o: 'https://photo2o.png' }
          ]
        }
      })
    )

    const photos = await getPhotos(1)

    expect(photos).toEqual([
      { id: 'id1', source: 'https://photo1.png' },
      { id: 'id2', source: 'https://photo2.png' }
    ])
  })

  test('fallbacks to original image if medium image not found', async () => {
    fetch.mockResponses(
      JSON.stringify({
        photos: {
          photo: [
            { id: 'id1', url_o: 'https://photo1o.png' },
            { id: 'id2', url_m: 'https://photo2.png', url_o: 'https://photo2o.png' }
          ]
        }
      })
    )

    const photos = await getPhotos(1)

    expect(photos).toEqual([
      { id: 'id1', source: 'https://photo1o.png' },
      { id: 'id2', source: 'https://photo2.png' }
    ])
  })

  test('throws if any http error', async () => {
    expect.assertions(1)

    fetch.mockResponses(
      [JSON.stringify({}), { status: 500 }]
    )

    try {
      await getPhotos(1)
    } catch (_) {
      expect(1).toBe(1)
    }
  })
})
