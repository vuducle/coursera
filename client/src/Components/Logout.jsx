import React, {useState} from 'react'
import {Button} from "react-bootstrap"
import { useCookies } from 'react-cookie';
import Cookies from 'universal-cookie';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation  } from "react-router-dom"
import { onLogout, authenticate } from '../redux/actions';


function Logout() {
    const [cookies, removeCookie] = useCookies(['gigachad'])
    const cookiesU = new Cookies();
    const dispatch = useDispatch();
    let navigate = useNavigate(),
        location = useLocation(),
        from = location.state?.from?.pathname || "/";


    const onLogout = async () => {
        let response = await fetch("https://localhost:3443/users/logout", 
        {
            method: "GET",
            headers: {
                "Authorization": "Bearer" + cookies.gigachad.token
            }
        })
        if (response) {
            dispatch(authenticate())
            cookiesU.remove("gigachad", {path: "/"})
            navigate(from, {replace: true})
            window.location.reload()   
        }
        console.log(response);
    }
    
    return (
        <div>
            <Button variant="light" onClick={onLogout}>
                Logout
            </Button>
        </div>
    )
}

export default Logout