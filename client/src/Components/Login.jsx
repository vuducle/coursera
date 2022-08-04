import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  FormControl,
  FormLabel,
  Input,
  InputRightElement
} from '@chakra-ui/react'

import React, {useState, useEffect} from 'react'
import { useNavigate  } from "react-router-dom"
function Login() {
    const {
        isOpen, onOpen, onClose, getDisclosureProps
    } = useDisclosure();
    const initialRef = React.useRef(null)
    const [show, setShow] = React.useState(false)
    const exec = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const discloseProps = getDisclosureProps();
    useEffect(() => {
        if (localStorage.getItem("user-token")) {
            exec("/")
        }
        console.log(discloseProps);
        document.title = username
    }, [])

    const onLogin = async (e) => {
        let values = {
            username,
            password
        }

        let response = await fetch('https:localhost:3443/users/login', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(values)
        });

        response = await response.json();
        localStorage.setItem("user-token", JSON.stringify(response))

        exec("/")
    }
    const setUsernameFunction = (e) => {
        setUsername(e.target.value)
    }
    const setPasswordFunction = (e) => {
        setPassword(e.target.value)
    }
   
    return (
        <>
            <Button onClick={onOpen}>Login</Button>

            <Modal {...discloseProps} isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Modal Title</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <FormControl>
                        <FormLabel>Username</FormLabel>
                        <Input ref={initialRef} placeholder='Username' onChange={setUsernameFunction}/>
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel>Password</FormLabel>
                                <Input placeholder='Password' type={show ? 'text' : 'password'} onChange={setPasswordFunction} />
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={onLogin}>
                        Login
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default Login