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
    // const [image, setPicture] = useState(null);
    // const [imgData, setImgData] = useState(null);
    const [featured, setFeatured] = useState(false);
    let [image, setImage] = useState({ preview: '', data: '' })
    const [status, setStatus] = useState('')

    const [errMsg, setErrMsg] = useState("");
    const handleFileChange = (e) => {
        const img = {
        preview: URL.createObjectURL(e.target.files[0]),
        data: e.target.files[0],
        }
        setImage(img)
    }
    // const onChangePicture = e => {
    //     if (e.target.files[0]) {
    //     console.log("picture: ", e.target.files[0].name);
    //     setPicture(e.target.files[0]);
    //     const reader = new FileReader();
    //     reader.addEventListener("load", () => {
    //         setImgData(reader.result);
    //     });
    //     reader.readAsDataURL(e.target.files[0]);
    //     }
    // };
    const handleChange = async () => {
        await setFeatured(!featured)
    }
    const addPost = async (e) => {
        const formData = new FormData();
        formData.append("image", image.data)
        formData.append("name", name)
        formData.append("label", label)
        formData.append("category", category)
        formData.append("description", description)
        formData.append("price", parseInt(price))
        formData.append("featured", featured)
        try {
            let response = await fetch("https://localhost:3443/dishes", {
                body: formData,
                method: "POST",
                // redirect: 'follow',
                headers: {
                    // "Content-Type": "multipart/form-data",
                    "Authorization": "Bearer " + cookies.gigachad.token,
                }
            })
            if (response.status === 500) {
                setErrMsg("Server crashed")
                console.log(featured)
                
            }
            if (response.status === 201) {
                setErrMsg("Dish added")
            }

            if (response.status === 401) {
                setErrMsg("You are not authorized")
                console.log(formData);
            }

            errRef.current.focus();

        } catch (error) {
            console.log(error);
        }
        
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
                    <Form.Control step="any" type="number" placeholder="Price in €, for decimals use '.'" value={price} onChange={e => setPrice(e.target.value)}/>
                </Form.Group>

                {image.preview && <img src={image.preview} width='100' height='100' className="playerProfilePic_home_tile" />}

                <Form.Group controlId="formFile" className="mb-3">
                    <Form.Label>Upload image</Form.Label>
                    <Form.Control type="file" name='image' onChange={handleFileChange}/>
                </Form.Group>
                {status && <h4>{status}</h4>}
                <Form.Check 
                    type="switch"
                    id="featured"
                    label="Should it be featured?"
                    className='mb-3'
                    checked={featured}
                    onChange={handleChange}
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