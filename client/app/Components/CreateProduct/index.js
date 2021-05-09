import React, { useState, useContext } from 'react'
import axios from 'axios'
import { GlobalContext } from '@Context/GlobalContext'
import { isAdmin, Loader } from '@Components/Utils'
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
  const [token] = state.token
  const [images, setImages] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleUpload = async e => {
    e.preventDefault()
    try {
      if (!isAdmin()) {
        alert('You are not an Admin.')
      }
      const file = e.target.files[0]

      let formData = new FormData()
      formData.append('file', file)

      setLoading(true)
      const res = await axios.post('/api/upload', formData, {
        headers: {
          'content-type': 'multipart/form-data', Authorization: token
        }
      })

      setLoading(false)
      setImages(res.data.data)
    } catch (error) {
      alert(error.response.data.msg)
    }
  }

  const handleDestroy = async () => {
    try {
      if (!isAdmin()) {
        return alert('You are not an Admin.')
      }
      setLoading(true)
      await axios.post('/api/destroy', {
        public_id: images.public_id
      }, {
        headers: { Authorization: token }
      })
      setLoading(false)
      setImages(false)
    } catch (error) {
      alert(error.response.data.msg)
    }
  }

  const handleChangeInput = e => {
    const {name, value} = e.target
    setProduct({...product, [name]:value})
  }

  const styleUpload = {
    display: images ? 'block' : 'none'
  }

  return (
    <div className="create-product">
      <div className="upload">
        <input
          type="file"
          name="file"
          id={`${images ? 'has_img' : 'file_up' }`}
          onChange={handleUpload}
        />
        {
          loading ?
            <div id="file_img"><Loader /></div> :
            <div id="file_img" style={styleUpload}>
              <img src={images ? images.url : ''} alt="" />
              <span className="x-marked" onClick={handleDestroy}></span>
            </div>
        }
      </div>
      <form>
        <div className="group">
          <input
            type="text"
            name="product_id"
            id="product_id"
            required
            value={product.product_id}
            onChange={handleChangeInput}
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
            onChange={handleChangeInput}
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
            onChange={handleChangeInput}
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
            onChange={handleChangeInput}
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
            onChange={handleChangeInput}
            rows="7"
          />
          <label htmlFor="content">Content</label>
        </div>

        <div className="group select">
          <label htmlFor="categories">Categories: </label>
          <select name="category" value={product.category} onChange={handleChangeInput}>
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
