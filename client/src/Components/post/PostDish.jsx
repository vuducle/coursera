import React from 'react'
import { Button, Card, Modal, Form } from 'react-bootstrap'
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css"

function PostDish() {

    const [modalId, setModalId] = React.useState("");
    const handleClose = () => setModalId("");

    

    return (
        <>
        <Button type="button" variant="outline-primary" onClick={() => setModalId(`add-dish-modal`)}>
            Add Dish
        </Button>
        <Modal
            show={modalId === `add-dish-modal`}
            onHide={handleClose}
            aria-labelledby={`add-modal-label-open`}
            centered
        >
            <Modal.Header id={`add-modal-label-open`} closeButton>
                Add Dish
            </Modal.Header>
            <Modal.Body>
                <Form.Group className="mb-3" controlId="dishname">
                    <Form.Label>Your dish</Form.Label>
                    <Form.Control type="text" placeholder="Enter your dish" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="label">
                    <Form.Label>Label of dish</Form.Label>
                    <Form.Control type="text" placeholder="Label" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="category">
                    <Form.Label>Category</Form.Label>
                    <Form.Control type="text" placeholder="Category" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="description">
                    <Form.Label>Description of dish</Form.Label>
                    <Form.Control type="text" placeholder="Description" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="price">
                    <Form.Label>Price of dish</Form.Label>
                    <Form.Control type="number" placeholder="Price in €, for decimals use '.'" />
                </Form.Group>

                <Form.Group controlId="formFile" className="mb-3">
                    <Form.Label>Upload image</Form.Label>
                    <Form.Control type="file" />
                </Form.Group>

                <Button colorScheme='blue' type="submit" 
                >
                    Add Dish
                </Button>
            </Modal.Body>
        </Modal>
        </>
    )
}

export default PostDish