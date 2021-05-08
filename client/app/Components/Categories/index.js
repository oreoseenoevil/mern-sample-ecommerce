import React, { useState, useContext, Fragment } from 'react'
import { GlobalContext } from '@Context/GlobalContext'
import '@Components/Categories/index.scss'
import axios from 'axios'

export const Categories = () => {
  const { state } = useContext(GlobalContext)
  const [token] = state.token
  const [categories, setCategories] = state.categoriesAPI.categories
  const [callback, setCallback] = state.categoriesAPI.callback
  const [category, setCategory] = useState('')
  const [id, setID] = useState('')
  const [onEdit, setOnEdit] = useState(false)

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      if (onEdit) {
        const res = await axios.patch(`/api/category/${id}`, {
            name: category.toLowerCase()
          }, {
          headers: { Authorization: token }
        })

        alert(res.data.success && `Successfully Updated ${category} Category.`)
      } else {
        const res = await axios.post('/api/category', {
            name: category.toLowerCase()
          }, {
          headers: { Authorization: token }
        })

        alert(res.data.success && `Successfully Created ${category} Category.`)
      }

      setOnEdit(false)
      setID('')
      setCategory('')
      setCallback(!callback)
    } catch (error) {
      alert(error.response.data.msg)
    }
  }

  const handleDelete = async id => {
    try {
      const res = await axios.delete(`/api/category/${id}`, {
        headers: { Authorization: token }
      })  
      alert(res.data.success && `Successfully Deleted Category.`)
      setCallback(!callback)
    } catch (error) {
      alert(error.response.data.msg)
    }
  }

  const handleEdit = (id, name) => {
    setID(id)
    setCategory(name)
    setOnEdit(true)
  }

  return (
    <div className="categories">
      <form autoComplete="off" onSubmit={handleSubmit}>
        <div className="group">
          <input
            type="text"
            name="category"
            value={category}
            onChange={e => setCategory(e.target.value)}
            required
          />
          <span className="bar"></span>
          <label htmlFor="category">Category</label>
          <button type="submit">{onEdit ? 'Update' : 'Save'}</button>
        </div>
      </form>
      <Category
        categories={categories}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
    </div>
  )
}

export const Category = ({ categories, handleEdit, handleDelete }) => {
  return (
    <div className="col">
      {
        categories.map(category => (
          <div className="row" key={category._id}>
            <p>{category.name}</p>
            <div>
              <button onClick={() => handleEdit(category._id, category.name)}>Edit</button>
              <button onClick={() => handleDelete(category._id)}>Delete</button>
            </div>
          </div>
        ))
      }
    </div>
  )
}
