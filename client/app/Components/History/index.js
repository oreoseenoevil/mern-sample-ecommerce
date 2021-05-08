import React, { useState, useContext, useEffect } from 'react'
import { GlobalContext } from '@Context/GlobalContext'
import { Link, useParams } from 'react-router-dom'
import '@Components/History/index.scss'

export const OrderHistory = () => {
  const { state } = useContext(GlobalContext)
  const [history] = state.userAPI.history

  return (
    <div className="history">
      <h2>History</h2>
      <h4>You have {history.length} ordered.</h4>
      <table>
        <thead>
          <tr>
            <th>Payment ID</th>
            <th>Date of Purchased</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {
            history.map(item => (
              <tr key={item._id}>
                <td>{item.paymentID}</td>
                <td>{new Date(item.createdAt).toLocaleDateString()}</td>
                <td><Link to={`/history/${item._id}`}>View</Link></td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  )
}

export const OrderDetails = () => {
  const { state } = useContext(GlobalContext)
  const [history] = state.userAPI.history
  const [orderDetails, setOrderDetails] = useState([])

  const params = useParams()

  useEffect(() => {
    if (params.id) {
      history.forEach(item => {
        if (item._id === params.id) {
          setOrderDetails(item)
        }
      })
    }
  }, [params.id, history])

  if (orderDetails.length === 0) {
    return null
  }

  return (
    <div className="history">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Address</th>
            <th>Postal Code</th>
            <th>Country Code</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{orderDetails.address.recipient_name}</td>
            <td>{orderDetails.address.line1 + " - " + orderDetails.address.city}</td>
            <td>{orderDetails.address.postal_code}</td>
            <td>{orderDetails.address.country_code}</td>
          </tr>
        </tbody>
      </table>
      <table style={{ margin: '30px 0'}}>
        <thead>
          <tr>
            <th></th>
            <th>Products</th>
            <th>Quantity</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
            {
              orderDetails.cart.map(item => (
                <tr key={item._id}>
                  <td><img src={item.images.url} alt={item.description} /></td>
                  <td>{item.product_id}</td>
                  <td>{item.quantity}</td>
                  <td>$ {item.price}</td>
                </tr>
              ))
            }
        </tbody>
      </table>
    </div>
  )
}
