import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col, Container } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Paginate from '../components/Paginate'
import {
  listProducts,
  deleteProduct,
  createProduct,
} from '../actions/product-actions'
import { productActions } from '../store/product-slice'

const ProductListScreen = () => {
  const { keyword, pageNumber } = useParams()
  const dispatch = useDispatch()

  const productsState = useSelector((state) => state.products)
  const { products, loading, error, pages, page } = productsState

  const productState = useSelector((state) => state.product)
  const {
    deleteStatus,
    deleteMessage,
    createProductStatus,
    createProductMessage,
    createdProduct,
  } = productState

  const userInfo = useSelector((state) => state.user.userInfo)

  const navigate = useNavigate()

  useEffect(() => {
    if (!userInfo || !userInfo.isAdmin) {
      navigate('/login')
    }

    if (createProductStatus === 'success') {
      navigate(`/admin/product/${createdProduct._id}/edit`)
    } else if (createProductStatus !== 'pending') {
      dispatch(listProducts('', pageNumber))
      dispatch(productActions.getProductReset())
    }
  }, [
    dispatch,
    navigate,
    userInfo,
    deleteStatus,
    createProductStatus,
    createdProduct,
    pageNumber,
  ])

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure?')) {
      dispatch(deleteProduct(id))
    }
  }

  const createProductHandler = () => {
    dispatch(createProduct())
  }

  return (
    <>
      <Container>
        <Row className='align-items-center'>
          <Col xs={10}>
            <h1>Products</h1>
          </Col>
          <Col className='text-right'>
            <Button className='my-3' onClick={createProductHandler}>
              <i className='fas fa-plus'></i> Create Product
            </Button>
          </Col>
        </Row>
      </Container>
      {/* {deleteStatus === 'pending' && <Loader />} */
      /* Loader useless here, because there is already one */}
      {deleteStatus === 'error' && (
        <Message variant='danger'>{deleteMessage}</Message>
      )}
      {createProductStatus === 'error' && (
        <Message variant='danger'>{createProductMessage}</Message>
      )}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th>BRAND</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>${product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>
                  <td>
                    <LinkContainer to={`/admin/product/${product._id}/edit`}>
                      <Button variant='light' className='btn-sm'>
                        <i className='fas fa-edit'></i>
                      </Button>
                    </LinkContainer>
                    <Button
                      variant='danger'
                      className='btn-sm'
                      onClick={() => deleteHandler(product._id)}
                    >
                      <i className='fas fa-trash'></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Paginate pages={pages} page={page} isAdmin={true} />
        </>
      )}
    </>
  )
}

export default ProductListScreen
