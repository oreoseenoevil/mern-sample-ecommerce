import React, { useContext } from 'react'
import { GlobalContext } from '@Context/GlobalContext'

export const Filters = () => {
  const { state } = useContext(GlobalContext)
  
  const [products, setProducts] = state.productsAPI.products
  const [categories] = state.categoriesAPI.categories
  const [category, setCategory] = state.productsAPI.category
  const [sort, setSort] = state.productsAPI.sort
  const [search, setSearch] = state.productsAPI.search

  const handleCategory = e => {
    setCategory(e.target.value)
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
    </div>
  )
}
