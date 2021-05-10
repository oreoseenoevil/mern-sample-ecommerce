import React, { useContext } from 'react'
import { GlobalContext } from '@Context/GlobalContext'

export const Filters = () => {
  const { state } = useContext(GlobalContext)
  const [categories] = state.categoriesAPI.categories
  const [category, setCategory] = state.productsAPI.category
  const [sort, setSort] = state.productsAPI.sort
  const [search, setSearch] = state.productsAPI.search

  const handleCategory = e => {
    setCategory(e.target.value)
    setSearch('')
  }

  return (
    <div className="filter-menu">
      <div className="row">
        <span>Filters: </span>
        <select
          name="category"
          value={category}
          onChange={handleCategory}
        >
          <option value="">All Products</option>
          {
            categories.map(category => (
              <option
                value={`category=${category._id}`}
                key={category._id}
              >
                {category.name}
              </option>
            ))
          }
        </select>
      </div>
      <input type="text"
        placeholder="What are you looking for?"
        value={search}
        onChange={e => setSearch(e.target.value.toLowerCase())}
      />
      <div className="row sort">
        <span>Sort by: </span>
        <select
          name="sort"
          value={sort}
          onChange={e => setSort(e.target.value)}
        >
          <option value="">Newest</option>
          <option value="sort=oldest">Oldest</option>
          <option value="sort=-sold">Best Seller</option>
          <option value="sort=-price">Price: High-Low</option>
          <option value="sort=price">Price: Low-High</option>
        </select>
      </div>
    </div>
  )
}
