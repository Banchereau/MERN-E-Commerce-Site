import React, { useEffect, useState } from 'react'
import { Link, useLocation, useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
  ListGroupItem,
} from 'react-bootstrap'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { addToCart, removeFromCart } from '../actions/cart-actions'
import { orderActions } from '../store/order-slice'

const CartScreen = () => {
  const { id } = useParams()
  const [removedItem, setRemovedItem] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  const quantity = location.search ? Number(location.search.split('=')[1]) : 1

  const dispatch = useDispatch()

  const cart = useSelector((state) => state.cart)
  const { cartItems, status, message } = cart

  useEffect(() => {
    if (id) {
      dispatch(addToCart(id, quantity))
    }
  }, [dispatch, id, quantity])

  const removeFromCartHandler = (id) => {
    setRemovedItem(true)
    dispatch(removeFromCart(id))
  }

  const checkoutHandler = () => {
    dispatch(orderActions.orderAddItemReset())
    navigate('/login?redirect=shipping')
  }

  return (
    <Row>
      <Col md={8}>
        <h1>Shopping Cart</h1>
        {status === 'pending' ? (
          <Loader />
        ) : status === 'error' ? (
          <Message variant='danger'>{message}</Message>
        ) : cartItems.length === 0 ? (
          <Message>
            Your cart is empty <Link to='/'>Go back</Link>
          </Message>
        ) : (
          <ListGroup variant='flush'>
            {cartItems.map((item) => (
              <ListGroupItem key={item._id}>
                <Row>
                  <Col md={2}>
                    <Image src={item.image} alt={item.name} fluid rounded />
                  </Col>
                  <Col md={3}>
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                  </Col>
                  <Col md={2}>${item.price}</Col>
                  <Col md={2}>
                    <Form.Control
                      as='select'
                      value={item.quantity}
                      onChange={(e) =>
                        dispatch(addToCart(item.id, Number(e.target.value)))
                      }
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>
                  <Col md={2}>
                    <Button
                      type='button'
                      variant='light'
                      onClick={() => removeFromCartHandler(item.id)}
                    >
                      <i className='fas fa-trash'></i>
                    </Button>
                  </Col>
                </Row>
              </ListGroupItem>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        {(status === 'success' || !id) && (
          <Card>
            <ListGroup variant='flush'>
              <ListGroupItem className='mx-auto'>
                <Row>
                  <Col>
                    <h2 className='mx-auto'>
                      subtotal (
                      {cartItems.reduce((acc, item) => acc + item.quantity, 0)})
                      items
                    </h2>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <div className='text-center'>
                      $
                      {cartItems.reduce(
                        (acc, item) => acc + item.quantity * item.price,
                        0
                      )}
                    </div>
                  </Col>
                </Row>
              </ListGroupItem>
              <ListGroupItem className='mx-auto'>
                <Button
                  type='button'
                  className='btn-block'
                  disabled={cartItems.length === 0}
                  onClick={checkoutHandler}
                >
                  Proceed To Checkout
                </Button>
              </ListGroupItem>
            </ListGroup>
          </Card>
        )}
      </Col>
    </Row>
  )
}

export default CartScreen
