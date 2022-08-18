import React from 'react'
import {Button} from "react-bootstrap"
import { useCookies } from 'react-cookie';
import Cookies from 'universal-cookie';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation  } from "react-router-dom"
import { onLogout, authenticate } from '../redux/actions';

function Register() {
    return (
        <Button variant="light" className="signUp">
            Register
        </Button>
    )
}

export default Register