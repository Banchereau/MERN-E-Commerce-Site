import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listProducts } from '../actions/product-actions'

const HomeScreen = () => {
  const dispatch = useDispatch()
  const products = useSelector((state) => state.products.products)
  const notification = useSelector((state) => state.ui.notification)
  useEffect(() => {
    dispatch(listProducts())
  }, [dispatch])

  return (
    <>
      <h1>Latest Products</h1>
      {notification.status === 'pending' ? (
        <Loader />
      ) : notification.status === 'error' ? (
        <Message variant='danger'>{notification.message}</Message>
      ) : (
        <Row>
          {products.map((product) => (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
      )}
    </>
  )
}

export default HomeScreen
