// @flow
import React, { useMemo } from 'react'
import s from './Header.module.css'
import { debounce } from 'throttle-debounce'

type Props = {
  onQuery: (string) => void
}

const prevent = (e) => e.preventDefault()

export default ({ onQuery }: Props) => {
  const throttledOnQuery = useMemo(() => (
    debounce(300, onQuery)
  ), [onQuery])

  return (
    <header className={s.header}>
      <h1>Sports Gallery</h1>
      <form
        className={s.searchForm}
        onSubmit={prevent}
      >
        <input
          type='search'
          placeholder='Freetext search...'
          onInput={e => throttledOnQuery(e.currentTarget.value)}
        />
      </form>
    </header>
  )
}
