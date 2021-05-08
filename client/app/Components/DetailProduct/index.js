import React, { useContext, useState, useEffect, Fragment } from 'react'
import { useParams, Link } from 'react-router-dom'
import { GlobalContext } from '@Context/GlobalContext'
import { ProductItem } from '@Components/Products'
import '@Components/DetailProduct/detailproduct.scss'

export const DetailProduct = () => {
  const params = useParams()
  const { state }= useContext(GlobalContext)
  const [products] = state.productsAPI.products
  const addCart = state.userAPI.addCart
  const [detailProduct, setDetailProduct] = useState([])

  useEffect(() => {
    if (params.id) {
      products.forEach(product => {
        if(product._id === params.id) {
          setDetailProduct(product)
        }
      })
    }
  }, [params.id, products])

  if (detailProduct.length === 0) return null

  return (
    <Fragment>
      <div className="detail-product">
        <img src={detailProduct.images.url} alt={detailProduct.title} />
        <div className="box-detail">
          <div className="row">
            <h2>{detailProduct.title}</h2>
            <h6>code: {detailProduct.product_id}</h6>
          </div>
          <span>$ {detailProduct.price}</span>
          <p>{detailProduct.description}</p>
          <p>{detailProduct.content}</p>
          <p>Sold: {detailProduct.sold}</p>
          <Link
            to="/cart"
            className="cart"
            onClick={() => addCart(detailProduct)}
            replace
          >
            Buy Now
          </Link>
        </div>
      </div>
      <div>
        <h2>Related Products</h2>
        <div className="products">
          {
            products.map(product => {
              return product.category === detailProduct.category ? <ProductItem key={product._id} product={product} /> : null
            })
          }
        </div>
      </div>
    </Fragment>
  )
}
