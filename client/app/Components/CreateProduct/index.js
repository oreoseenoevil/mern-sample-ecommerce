import React, { useState, useContext } from 'react'
import axios from 'axios'
import { GlobalContext } from '@Context/GlobalContext'
import {} from '@Components/Utils'
import '@Components/CreateProduct/index.scss'

const initialState = {
  product_id: '',
  title: '',
  price: 0,
  description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit, eligendi!',
  content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus modi neque voluptas adipisci expedita iure?',
  category: ''
}

export const CreateProduct = () => {
  const { state } = useContext(GlobalContext)
  const [product, setProduct] = useState(initialState)
  const [categories] = state.categoriesAPI.categories
  const [images, setImages] = useState(false)
  const [loading, setLoading] = useState(false)

  const styleUpload = {
    display: images ? 'block' : 'none'
  }

  return (
    <div className="create-product">
      <div className="upload">
        <input type="file" name="file" id="file_up" />
        <div id="file_img" style={styleUpload}>
          <img src="" alt="" />
          <span className="x-marked"></span>
        </div>
      </div>
      <form>
        <div className="group">
          <input
            type="text"
            name="product_id"
            id="product_id"
            required
            value={product.product_id}
          />
          <span className="bar"></span>
          <label htmlFor="product_id">Product ID</label>
        </div>

        <div className="group">
          <input
            type="text"
            name="title"
            id="title"
            required
            value={product.title}
          />
          <span className="bar"></span>
          <label htmlFor="title">Title</label>
        </div>

        <div className="group">
          <input
            type="number"
            name="price"
            id="price"
            required
            value={product.price}
          />
          <span className="bar"></span>
          <label htmlFor="price">Price</label>
        </div>

        <div className="group">
          <textarea
            type="text"
            name="description"
            id="description"
            required
            value={product.description}
            rows="5"
          />
          <label htmlFor="description">Description</label>
        </div>

        <div className="group">
          <textarea
            type="text"
            name="content"
            id="content"
            required
            value={product.content}
            rows="7"
          />
          <label htmlFor="content">Content</label>
        </div>

        <div className="group select">
          <label htmlFor="categories">Categories: </label>
          <select name="categories" value={product.category}>
            <option value="">Please select a category</option>
            {
              categories.map(category => (
                <option value={category._id} key={category._id}>
                  {category.name}
                </option>
              ))
            }
          </select>
        </div>
        <div className="group">
          <button type="submit">Create</button>
        </div>
      </form>
    </div>
  )
}
