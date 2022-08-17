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
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation  } from "react-router-dom"
import { authenticate } from '../redux/actions';
import { useCookies } from 'react-cookie';

function Login() {
    const {
        isOpen, onOpen, onClose, getDisclosureProps
    } = useDisclosure();
    const initialRef = React.useRef(null)
    const [show, setShow] = React.useState(false)
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const discloseProps = getDisclosureProps();
    const dispatch = useDispatch();
    
    let navigate = useNavigate(),
        location = useLocation(),
        from = location.state?.from?.pathname || "/dashboard";

    const [cookies, setCookie] = useCookies(['gigachad'])

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
        sessionStorage.setItem("user-token", JSON.stringify(response))
        setCookie('gigachad', JSON.stringify(response), {
            path: '/',
            maxAge: 60 * 60
        })
        if (response) {
            dispatch(authenticate())
            onClose()
            navigate(from, {replace: true})   
        }
        
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