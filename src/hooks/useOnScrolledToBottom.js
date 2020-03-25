// @flow
import { useEffect } from 'react'
import { throttle } from 'throttle-debounce'

export default (callback: () => void) => {
  useEffect(() => {
    const throttled = throttle(300, () => {
      if (document.body) {
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
          callback()
        }
      }
    })
    window.addEventListener('scroll', throttled)
    return () => window.removeEventListener('scroll', throttled)
  }, [callback])
}
