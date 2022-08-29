import React, { useState, useEffect, useRef } from 'react'
import { Button, Card, Modal, Form } from 'react-bootstrap'
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css"
import { useCookies } from 'react-cookie';
import Cookies from 'universal-cookie';

function PostDish() {
    const [cookies, removeCookie] = useCookies(['gigachad'])
    const cookiesU = new Cookies();

    const [modalId, setModalId] = React.useState("");
    const handleClose = () => setModalId("");
    const errRef = useRef();

    const [name, setDishName] = useState("");
    const [label, setLabel] = useState("");
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [image, setPicture] = useState(null);
    const [imgData, setImgData] = useState(null);
    const [featured, setFeatured] = useState(false);

    const [errMsg, setErrMsg] = useState("");

    const onChangePicture = e => {
        if (e.target.files[0]) {
        console.log("picture: ", e.target.files);
        setPicture(e.target.files[0]);
        const reader = new FileReader();
        reader.addEventListener("load", () => {
            setImgData(reader.result);
        });
        reader.readAsDataURL(e.target.files[0]);
        }
    };
    

    const addPost = async () => {
        let values = {
            name,
            label,
            category,
            description,
            price,
            image
        }

        let response = await fetch("https://localhost:3443/dishes", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer" + cookies.gigachad.token
            },
            // credentials: "include",
            body: JSON.stringify(values)
        })
        if (response.status === 500) {
            setErrMsg("Dish already taken")
        }
        if (response.status === 200) {
            setErrMsg("Dish added")
        }

        if (response.status === 401) {
            setErrMsg("You are not authorized")
            console.log(values);
        }

        errRef.current.focus();
    }

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
                    <Form.Control type="text" placeholder="Enter your dish" value={name} onChange={e => setDishName(e.target.value)}/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="label">
                    <Form.Label>Label of dish</Form.Label>
                    <Form.Control type="text" placeholder="Label" value={label} onChange={e => setLabel(e.target.value)} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="category">
                    <Form.Label>Category</Form.Label>
                    <Form.Control type="text" placeholder="Category" value={category} onChange={e => setCategory(e.target.value)}/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="description">
                    <Form.Label>Description of dish</Form.Label>
                    <Form.Control type="text" placeholder="Description" value={description} onChange={e => setDescription(e.target.value)}/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="price">
                    <Form.Label>Price of dish</Form.Label>
                    <Form.Control type="number" placeholder="Price in €, for decimals use '.'" value={price} onChange={e => setPrice(e.target.value)}/>
                </Form.Group>

                <div className="previewProfilePic">
                    <img className="playerProfilePic_home_tile" src={imgData} />
                </div>
                <Form.Group controlId="formFile" className="mb-3">
                    <Form.Label>Upload image</Form.Label>
                    <Form.Control type="file" onChange={onChangePicture} />
                </Form.Group>

                <Form.Check 
                    type="switch"
                    id="featured"
                    label="Should it be featured?"
                    className='mb-3'
                    value={featured}
                    onChange={setFeatured}
                />
                <Button colorScheme='blue' type="submit" onClick={addPost}
                >
                    Add Dish
                </Button>
                <Form.Text ref={errRef}
                className={errMsg ? "errmsg" : "offscreen"}
                aria-live="assertive">
                    {errMsg}
                </Form.Text>
            </Modal.Body>
        </Modal>
        </>
    )
}

export default PostDish