import React, { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  Row,
  Col,
  Image,
  ListGroup,
  Button,
  ListGroupItem,
  Form,
} from 'react-bootstrap'
import {
  listProductDetails,
  createProductReview,
} from '../actions/product-actions'
import Rating from '../components/Rating'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { productActions } from '../store/product-slice'

const ProductScreen = () => {
  const [quantity, setQuantity] = useState(1)
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')

  const { id } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const productState = useSelector((state) => state.product)
  const {
    product,
    getProductLoading: loading,
    getProductErrorMsg: error,
    createReviewSuccess,
    createReviewError,
    createReviewLoading,
  } = productState

  const userInfo = useSelector((state) => state.user.userInfo)

  useEffect(() => {
    if (createReviewSuccess) {
      alert('Review Submitted!')
      setRating(0)
      setComment('')
      dispatch(productActions.createReviewReset)
    }
    dispatch(listProductDetails(id))
    return () => {
      dispatch(productActions.createReviewReset())
    }
  }, [dispatch, id, createReviewSuccess])

  const addToCartHandler = () => {
    navigate(`/cart/${id}?quantity=${quantity}`)
  }

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(
      createProductReview(id, {
        rating,
        comment,
      })
    )
  }

  return (
    <>
      <Link className='btn btn-dark my-3 rounded' to='/'>
        Go back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <div>
          <div className='hidden-xs'>
            <Row>
              <Col xl={6} lg={9}>
                <div className='text-center'>
                  <Image src={product.image} alt={product.name} fluid />
                </div>
              </Col>
              <Col xl={{ order: 2 }} lg={{ order: 3 }}>
                <ListGroup variant='flush'>
                  <ListGroupItem>
                    <h3>{product.name}</h3>
                  </ListGroupItem>
                  <ListGroupItem>
                    <Rating
                      value={product.rating}
                      text={`${product.numReviews} reviews`}
                    />
                  </ListGroupItem>
                  <ListGroupItem>Price: ${product.price}</ListGroupItem>
                  <ListGroupItem>
                    Description: ${product.description}
                  </ListGroupItem>
                </ListGroup>
              </Col>

              <Col xl={{ order: 3 }} lg={{ order: 2 }}>
                <ListGroup>
                  <ListGroup.Item>
                    <Row>
                      <Col>Price:</Col>
                      <Col>
                        <strong>${product.price}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Status:</Col>
                      <Col>
                        {product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  {product.countInStock > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col className='my-auto'>Qty</Col>
                        <Col>
                          <Form.Control
                            as='select'
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                          >
                            {[...Array(product.countInStock).keys()].map(
                              (x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              )
                            )}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}
                  <ListGroup.Item>
                    <Button
                      onClick={addToCartHandler}
                      className='btn-block w-100'
                      type='button'
                      disabled={product.countInStock === 0}
                    >
                      Add to Cart
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <h2>Reviews</h2>
                {product.reviews.length === 0 && <Message>No Reviews</Message>}
                <ListGroup variant='flush'>
                  {product.reviews.map((review) => (
                    <ListGroup.Item key={review._id}>
                      <strong>{review.name}</strong>
                      <Rating value={review.rating} />
                      <p>{review.createdAt.substring(0, 10)}</p>
                      <p>{review.comment}</p>
                    </ListGroup.Item>
                  ))}
                  <ListGroup.Item>
                    <h2>Write a Customer Review</h2>
                    {createReviewSuccess && (
                      <Message variant='success'>
                        Review submitted successfully
                      </Message>
                    )}
                    {createReviewLoading && <Loader />}
                    {createReviewError && (
                      <Message variant='danger'>{createReviewError}</Message>
                    )}
                    {userInfo ? (
                      <Form onSubmit={submitHandler}>
                        <Form.Group controlId='rating'>
                          <Form.Label>Rating</Form.Label>
                          <Form.Control
                            as='select'
                            value={rating}
                            onChange={(e) => setRating(e.target.value)}
                          >
                            <option value=''>Select...</option>
                            <option value='1'>1 - Poor</option>
                            <option value='2'>2 - Fair</option>
                            <option value='3'>3 - Good</option>
                            <option value='4'>4 - Very Good</option>
                            <option value='5'>5 - Excellent</option>
                          </Form.Control>
                        </Form.Group>
                        <Form.Group controlId='comment'>
                          <Form.Label>Comment</Form.Label>
                          <Form.Control
                            as='textarea'
                            row='3'
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                          ></Form.Control>
                        </Form.Group>
                        <Button
                          disabled={createReviewLoading}
                          type='submit'
                          variant='primary'
                        >
                          Submit
                        </Button>
                      </Form>
                    ) : (
                      //
                      <Message>
                        Please <Link to='/login'>sign in</Link> to write a
                        review{' '}
                      </Message>
                    )}
                  </ListGroup.Item>
                </ListGroup>
              </Col>
            </Row>
          </div>
          <div className='hidden-lg'>
            <Row>
              <Col xs={12}>
                <div className='text-center'>
                  <Image src={product.image} alt={product.name} fluid />
                </div>
              </Col>
              <Col xs={12}>
                <ListGroup variant='flush'>
                  <ListGroupItem>
                    <h3>{product.name}</h3>
                  </ListGroupItem>
                  <ListGroupItem>
                    <Rating
                      value={product.rating}
                      text={`${product.numReviews} reviews`}
                    />
                  </ListGroupItem>
                  <ListGroupItem>Price: ${product.price}</ListGroupItem>
                  <ListGroupItem>
                    Description: ${product.description}
                  </ListGroupItem>
                </ListGroup>
              </Col>

              <Col xs={12}>
                <ListGroup>
                  <ListGroup.Item>
                    <Row>
                      <Col>Price:</Col>
                      <Col>
                        <strong>${product.price}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Status:</Col>
                      <Col>
                        {product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  {product.countInStock > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col className='my-auto'>Qty</Col>
                        <Col>
                          <Form.Control
                            as='select'
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                          >
                            {[...Array(product.countInStock).keys()].map(
                              (x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              )
                            )}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}
                  <ListGroup.Item>
                    <Button
                      onClick={addToCartHandler}
                      className='btn-block w-100'
                      type='button'
                      disabled={product.countInStock === 0}
                    >
                      Add to Cart
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <h2>Reviews</h2>
                {product.reviews.length === 0 && <Message>No Reviews</Message>}
                <ListGroup variant='flush'>
                  {product.reviews.map((review) => (
                    <ListGroup.Item key={review._id}>
                      <strong>{review.name}</strong>
                      <Rating value={review.rating} />
                      <p>{review.createdAt.substring(0, 10)}</p>
                      <p>{review.comment}</p>
                    </ListGroup.Item>
                  ))}
                  <ListGroup.Item>
                    <h2>Write a Customer Review</h2>
                    {createReviewSuccess && (
                      <Message variant='success'>
                        Review submitted successfully
                      </Message>
                    )}
                    {createReviewLoading && <Loader />}
                    {createReviewError && (
                      <Message variant='danger'>{createReviewError}</Message>
                    )}
                    {userInfo ? (
                      <Form onSubmit={submitHandler}>
                        <Form.Group controlId='rating'>
                          <Form.Label>Rating</Form.Label>
                          <Form.Control
                            as='select'
                            value={rating}
                            onChange={(e) => setRating(e.target.value)}
                          >
                            <option value=''>Select...</option>
                            <option value='1'>1 - Poor</option>
                            <option value='2'>2 - Fair</option>
                            <option value='3'>3 - Good</option>
                            <option value='4'>4 - Very Good</option>
                            <option value='5'>5 - Excellent</option>
                          </Form.Control>
                        </Form.Group>
                        <Form.Group controlId='comment'>
                          <Form.Label>Comment</Form.Label>
                          <Form.Control
                            as='textarea'
                            row='3'
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                          ></Form.Control>
                        </Form.Group>
                        <Button
                          disabled={createReviewLoading}
                          type='submit'
                          variant='primary'
                        >
                          Submit
                        </Button>
                      </Form>
                    ) : (
                      //
                      <Message>
                        Please <Link to='/login'>sign in</Link> to write a
                        review{' '}
                      </Message>
                    )}
                  </ListGroup.Item>
                </ListGroup>
              </Col>
            </Row>
          </div>
        </div>
      )}
    </>
  )
}

export default ProductScreen
