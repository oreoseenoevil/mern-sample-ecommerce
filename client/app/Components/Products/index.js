import React, { Fragment, useContext } from 'react'
import { GlobalContext } from '@Context/GlobalContext'
import { Link } from 'react-router-dom'
import { Loader, isAdministrator } from '@Components/Utils'
import '@Components/Products/index.scss'

export const Products = () => {
  const { state } = useContext(GlobalContext)
  
  const [products] = state.productsAPI.products

  return (
    <Fragment>
      <div className="products">
        {
          products.map(product => {
            return (
              <ProductItem
                key={product._id}
                product={product}
                isAdmin={isAdministrator}
              />
            )
          })
        }
      </div>
      {products.length === 0 && <Loader />}
    </Fragment>
  )
}

export const ProductItem = ({product, isAdmin}) => {
  return (
    <div className="product-card">
      {
        isAdmin &&
        <input type="checkbox" checked={product.checked} readOnly />
      }
      <img src={product.images.url} alt=""/>
      <div className="product-box">
        <h2 title={product.title}>{product.title}</h2>
        <span>${product.price}</span>
        <p>{product.description}</p>
      </div>
      <Button
        product={product}
        isAdmin={isAdmin}
      />
    </div>
  )
}

export const Button = ({product, isAdmin}) => {
  const { state } = useContext(GlobalContext)
  
  const addCart = state.userAPI.addCart

  return (
    <div className="row-btn">
      {
        isAdmin() ?
          <Fragment>
            <Link id="btn-buy" to="#!" replace>
              Delete
            </Link>
            <Link id="btn-view" to={`/edit_product/${product._id}`} replace>
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
