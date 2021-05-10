import React, { Fragment, useContext, useState } from 'react'
import { GlobalContext } from '@Context/GlobalContext'
import { Link } from 'react-router-dom'
import { Loader, isAdmin } from '@Components/Utils'
import axios from 'axios'
import '@Components/Products/index.scss'

export const Products = () => {
  const { state } = useContext(GlobalContext)
  const [token] = state.token
  const [products, setProducts] = state.productsAPI.products
  const [callback, setCallback] = state.productsAPI.callback

  const [isCheck, setIsCheck] = useState(false)

  const deleteProduct = async (id, public_id) => {
    try {
      await axios.post('/api/destroy', {
        public_id: public_id
      }, { headers: { Authorization: token }})

      await axios.delete(`/api/product/${id}`, {
        headers: { Authorization: token }
      })

      setCallback(!callback)
    } catch (error) {
      alert(error.response.data.msg)
    }
  }

  const handleCheck = id => {
    products.forEach(product => {
      if (product._id === id) {
        product.checked = !product.checked
      }
    })

    setProducts([...products])
  }

  const checkAll = () => {
    products.forEach(product => {
      product.checked = !isCheck
    })

    setIsCheck(!isCheck)
    setProducts([...products])
  }

  const deleteAll = () => {
    products.forEach(product => {
      if (product.checked) {
        if (confirm('Are you sure?')) {
          deleteProduct(product._id, product.images.public_id)
        }
      }
    })
  }

  return (
    <Fragment>
      {
        isAdmin() &&
        <div className="delete-all">
          <span>Select all</span>
          <input type="checkbox" checked={isCheck} onChange={checkAll} />
          <button onClick={() => deleteAll()}>Delete All</button>
        </div>
      }
      <div className="products">
        {
          products.map(product => {
            return (
              <ProductItem
                key={product._id}
                product={product}
                deleteProduct={deleteProduct}
                handleCheck={handleCheck}
              />
            )
          })
        }
      </div>
      {products.length === 0 && <Loader />}
    </Fragment>
  )
}

export const ProductItem = ({product, deleteProduct, handleCheck}) => {
  return (
    <div className="product-card">
      {
        isAdmin() &&
        <input
          type="checkbox"
          checked={product.checked}
          readOnly
          onChange={() => handleCheck(product._id)}
        />
      }
      <img src={product.images.url} alt=""/>
      <div className="product-box">
        <h2 title={product.title}>{product.title}</h2>
        <span>${product.price}</span>
        <p>{product.description}</p>
      </div>
      <Button
        product={product}
        deleteProduct={deleteProduct}
      />
    </div>
  )
}

export const Button = ({product, deleteProduct}) => {
  const { state } = useContext(GlobalContext) 
  const addCart = state.userAPI.addCart

  return (
    <div className="row-btn">
      {
        isAdmin() ?
          <Fragment>
            <Link
              id="btn-buy"
              to="#!"
              replace
              onClick={() => deleteProduct(product._id, product.images.public_id)}
            >
              Delete
            </Link>
            <Link id="btn-view" to={`/product/edit/${product._id}`} replace>
              Edit
            </Link>
          </Fragment> :
          <Fragment>
            <Link id="btn-buy" to="#!" onClick={() => addCart(product)} replace>
              Buy
            </Link>
            <Link id="btn-view" to={`/detail/${product._id}`} replace>
              View
            </Link>
          </Fragment>
      }
    </div>
  )
}
