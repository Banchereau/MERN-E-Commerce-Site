import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import Header from './components/Header'
import Footer from './components/Footer'
import HomeScreen from './pages/HomeScreen'
import ProductScreen from './pages/ProductScreen'
import CartScreen from './pages/CartScreen'
import LoginScreen from './pages/LoginScreen'
import RegisterScreen from './pages/RegisterScreen'
import ProfileScreen from './pages/ProfileScreen'
import ShippingScreen from './pages/ShippingScreen'
import PaymentScreen from './pages/PaymentScreen'
import PlaceorderScreen from './pages/PlaceorderScreen'
import OrderScreen from './pages/OrderScreen'
import UserListScreen from './pages/UserListScreen'
import UserEditScreen from './pages/UserEditScreen'
import ProductListScreen from './pages/ProductListScreen'
import ProductEditScreen from './pages/ProductEditScreen'
import OrderListScreen from './pages/OrderListScreen'

const App = () => {
  return (
    <>
      <Router>
        <Header />
        <main className='py-3'>
          <Container>
            <Routes>
              <Route path='/' element={<HomeScreen />}></Route>
              <Route path='/page/:pageNumber' element={<HomeScreen />}></Route>
              <Route
                path='/search/:keyword/page/:pageNumber'
                element={<HomeScreen />}
              ></Route>
              <Route path='/search/:keyword' element={<HomeScreen />}></Route>
              <Route path='/login' element={<LoginScreen />}></Route>
              <Route path='/shipping' element={<ShippingScreen />}></Route>
              <Route path='/order/:id' element={<OrderScreen />}></Route>
              <Route path='/payment' element={<PaymentScreen />}></Route>
              <Route path='/placeorder' element={<PlaceorderScreen />}></Route>
              <Route path='/register' element={<RegisterScreen />}></Route>
              <Route path='/profile' element={<ProfileScreen />}></Route>
              <Route path='/product/:id' element={<ProductScreen />}></Route>
              <Route path='/cart' element={<CartScreen />}></Route>
              <Route
                path='/admin/userList'
                element={<UserListScreen />}
              ></Route>
              <Route
                path='/admin/user/:id/edit'
                element={<UserEditScreen />}
              ></Route>
              <Route
                path='/admin/productList'
                element={<ProductListScreen />}
              ></Route>
              <Route
                path='/admin/productList/:pageNumber'
                element={<ProductListScreen />}
              ></Route>
              <Route
                path='/admin/product/:id/edit'
                element={<ProductEditScreen />}
              ></Route>
              <Route path='/cart/:id' element={<CartScreen />}></Route>
              <Route
                path='/admin/orderlist'
                element={<OrderListScreen />}
              ></Route>
            </Routes>
          </Container>
        </main>
        <Footer />
      </Router>
    </>
  )
}

export default App
