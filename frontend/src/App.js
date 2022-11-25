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

const App = () => {
  return (
    <>
      <Router>
        <Header />
        <main className='py-3'>
          <Container>
            <Routes>
              <Route path='/' element={<HomeScreen />}></Route>
              <Route path='/login' element={<LoginScreen />}></Route>
              <Route path='/register' element={<RegisterScreen />}></Route>
              <Route path='/profile' element={<ProfileScreen />}></Route>
              <Route path='/product/:id' element={<ProductScreen />}></Route>
              <Route path='/cart' element={<CartScreen />}></Route>
              <Route path='/cart/:id' element={<CartScreen />}></Route>
            </Routes>
          </Container>
        </main>
        <Footer />
      </Router>
    </>
  )
}

export default App
