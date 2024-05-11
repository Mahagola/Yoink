import React from 'react'
import { Row, Col, Button } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import "./Home.css";
export default function Home() {
  return (
    <Row>
        <Col md={6} className="d-flex flex-direction-column justify-content-center align-items-center">
            <div>
                <h1>Hellow Folks!!!</h1>
                <p>Just Chat n Chill</p>
                <LinkContainer to="/chat">
                    <Button variant = "success">
                        Get Started <i className='fas fa-comments home-message-icon'></i>
                    </Button>
                </LinkContainer>
            </div>
        </Col>
        <Col md={6} className='home__bg'>

        </Col>
    </Row>
  )
}
