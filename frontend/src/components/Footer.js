import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

const Footer = () => {
  return (
    <footer>
      <Container>
        <Row>
          <Row>
            <Col className='text-center py-3'>Copyright &copy; ProShop</Col>
          </Row>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer
