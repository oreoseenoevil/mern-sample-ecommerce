import React, { useContext } from 'react'
import { GlobalContext } from '@Context/GlobalContext'

export const LoadMore = () => {
  const { state } = useContext(GlobalContext)
  const [page, setPage] = state.productsAPI.page
  const [result] = state.productsAPI.result

  return (
    <div className="load-more">
      {
        result < page * 9 ? ''
          : <button onClick={() => setPage(page+1)}>Load more</button>
      }
    </div>
  )
}
