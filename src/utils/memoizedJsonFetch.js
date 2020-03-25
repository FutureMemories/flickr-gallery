// @flow
const store = {}

export default async (url: string) => {
  if (!store[url]) {
    try {
      const result = await fetch(url)
      const data = await result.json()

      store[url] = data
    } catch (_) {
    }
  }

  return store[url]
}
