import React from 'react'
import { Container, Row, Col, Button, Card, Modal } from 'react-bootstrap'
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css"

import PostDish from './post/PostDish'

const Dashboard = () => {
    
    const [modalId, setModalId] = React.useState("");
    const handleClose = () => setModalId("");

    const data = [
        {
        Name: "Employee A",
        Uniquename: "employee-01"
        },
        {
        Name: "Employee B",
        Uniquename: "employee-02"
        },
        {
        Name: "Employee C",
        Uniquename: "employee-03"
        }
    ];
    return (
    <Container>
      <Row className='mt-4'>
        <Col>
            <h1>Dashboard</h1>
        </Col>
      </Row>
      <Row className='mt-4'>
        <Col>
            <PostDish />
             <Button variant="outline-primary">Add Promotions</Button>{' '}
             <Button variant="outline-primary">Add Leaders</Button>{' '}
        </Col>
      </Row>

      {data.map((pax, i) => (
        <Col xs={12} md={4} key={pax.Uniquename}>
          <Card>
            <Card.Body>
              <Card.Title as="h4">{pax.Uniquename}</Card.Title>
              <Button type="button" onClick={() => setModalId(`modal${i}`)}>
                Open Modal
              </Button>
            </Card.Body>
            <Modal
              show={modalId === `modal${i}`}
              onHide={handleClose}
              aria-labelledby={`${pax.Uniquename}ModalLabel`}
              centered
            >
              <Modal.Header id={`${pax.Uniquename}ModalLabel`} closeButton>
                {pax.Uniquename}
              </Modal.Header>
              <Modal.Body>Full Name: {pax.Name}</Modal.Body>
            </Modal>
          </Card>
        </Col>
      ))}
    </Container>
  );
}

export default Dashboard