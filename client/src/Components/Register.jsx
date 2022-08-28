import React, { useState, useEffect, useRef } from 'react'
import {Container, Row, Col} from "react-bootstrap"
import Form from 'react-bootstrap/Form';
import { Button, ButtonGroup } from '@chakra-ui/react'
import { useCookies } from 'react-cookie';
import Cookies from 'universal-cookie';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation  } from "react-router-dom"
import { onLogout, authenticate } from '../redux/actions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee, faCheck, faTimes, faInfoCircle } from '@fortawesome/free-solid-svg-icons'
function Register() {

    const USER_REGEX = /^\[A-z\][A-z0-9-_]{3,23}$/;
    const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

    const userRef = useRef();
    const errRef = useRef();
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);
    const [matchPwd, setMatchPwd] = useState("");

    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);
    const [errMsg, setErrMsg] = useState("");
    const [success, setSuccess] = useState(false);
    
    const [cookies, setCookie] = useCookies(['gigachad'])

    const dispatch = useDispatch();
    
    let navigate = useNavigate(),
        location = useLocation(),
        from = location.state?.from?.pathname || "/";


    // State events
    useEffect(() => {
        userRef.current.focus();
    }, []);
    useEffect(() => {
        setValidName(USER_REGEX.test(username));
    }, [username]);
    useEffect(() => {
        setValidPwd(PWD_REGEX.test(password));
        setValidMatch(password === matchPwd);
    }, [password, matchPwd]);
    useEffect(() => {
        setErrMsg("");
    }, [username, password, matchPwd]);

    const onRegister = async (e) => {
        e.preventDefault();
        const v1 = USER_REGEX.test(username);
        const v2 = PWD_REGEX.test(password);
        // if (!v1 || !v2) {
        //     setErrMsg("Invalid Entry");
        //     return;
        // }
        
        let values = {
            firstname,
            lastname,
            username,
            password
        }
       
        let response = await fetch("https:localhost:3443/users/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            // credentials: "include",
            body: JSON.stringify(values)
        })
       
        if (response.status === 500) {
            setErrMsg("Username taken")
        }
        if (response.status === 200) {
            // setCookie('gigachad', JSON.stringify(response), {
            //     path: '/',
            //     maxAge: 60 * 60
            // })
            dispatch(authenticate())
            navigate(from, {replace: true}) 
            setSuccess(true);
        }
        
        errRef.current.focus();
        
    }
//     disabled={
//     !validName || !validPwd || !validMatch
//     ? true
//     : false
// }
    return (
        <Container>
            <Form onSubmit={onRegister}>
                <Row>
                    <Col>
                        <Form.Group className="mb-3" controlId="firstname">
                            <Form.Label>First name</Form.Label>
                            <Form.Control onChange={(e) => setFirstname(e.target.value)} 
                            value={firstname}
                            type="input" placeholder="Enter Fistname" />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3" controlId="lastname">
                            <Form.Label>Last name</Form.Label>
                            <Form.Control 
                            onChange={(e) => setLastName(e.target.value)}
                            value={lastname}
                            type="input" placeholder="Enter Lastname" />
                        </Form.Group>
                    </Col>
                </Row>

                <Form.Group className="mb-3" controlId="username">
                    <Form.Label>Username
                        {/* <FontAwesomeIcon
                        icon={faCheck}
                        className={validName ? "valid" : "hide"}
                        />
                        <FontAwesomeIcon
                        icon={faTimes}
                        className={
                            validName || !username ? "hide" : "invalid"
                        }
                        /> */}
                    </Form.Label>
                    <Form.Control 
                        type="text" 
                        ref={userRef}
                        autoComplete="off"
                        onChange={(e) => setUsername(e.target.value)} 
                        value={username}
                        required
                        aria-invalid={validName ? "false" : "true"}
                        aria-describedby="uidnote"
                        onFocus={() => setUserFocus(true)}
                        onBlur={() => setUserFocus(false)}
                        placeholder="Enter username" />
                     <p
                        id="uidnote"
                        className={
                        userFocus && username && !validName
                            ? "instructions"
                            : "offscreen"
                        }
                    >
                        <FontAwesomeIcon icon={faInfoCircle} />
                        4 to 24 characters.
                        <br />
                        Must begin with a letter.
                        <br />
                        Letters, numbers, underscores, hyphens allowed.
                    </p>
                   
                </Form.Group>

                <Form.Group className="mb-3" controlId="password">
                    <Form.Label>
                        <FontAwesomeIcon
                        icon={faCheck}
                        className={validPwd ? "valid" : "hide"}
                        />
                        <FontAwesomeIcon
                        icon={faTimes}
                        className={
                            validPwd || !password ? "hide" : "invalid"
                        }
                        />
                        Password</Form.Label>
                    <Form.Control type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    required
                    aria-invalid={validPwd ? "false" : "true"}
                    aria-describedby="pwdnote"
                    onFocus={() => setPwdFocus(true)}
                    onBlur={() => setPwdFocus(false)} />

                     <p
                    id="pwdnote"
                    className={
                    pwdFocus && !validPwd
                        ? "instructions"
                        : "offscreen"
                    }
                >
                    <FontAwesomeIcon icon={faInfoCircle} />
                    8 to 24 characters.
                    <br />
                    Must include uppercase and lowercase letters, a
                    number and a special character.
                    <br />
                    Allowed special characters:{" "}
                    <span aria-label="exclamation mark">
                    !
                    </span>{" "}
                    <span aria-label="at symbol">@</span>{" "}
                    <span aria-label="hashtag">#</span>{" "}
                    <span aria-label="dollar sign">$</span>{" "}
                    <span aria-label="percent">%</span>
                </p>
                </Form.Group>

                <Form.Group className="mb-3" controlId="confirm_password">
                    <Form.Label>
                        Confirm Password:
                        <FontAwesomeIcon
                        icon={faCheck}
                        className={
                            validMatch && matchPwd ? "valid" : "hide"
                        }
                        />
                        <FontAwesomeIcon
                        icon={faTimes}
                        className={
                            validMatch || !matchPwd ? "hide" : "invalid"
                        }
                        />
                    </Form.Label>
                     <Form.Control 
                     type="password"
                    
                    onChange={(e) => setMatchPwd(e.target.value)}
                    value={matchPwd}
                    required
                    aria-invalid={validMatch ? "false" : "true"}
                    aria-describedby="confirmnote"
                    onFocus={() => setMatchFocus(true)}
                    onBlur={() => setMatchFocus(false)} />
                    <p
                        id="confirmnote"
                        className={
                        matchFocus && !validMatch
                            ? "instructions"
                            : "offscreen"
                        }
                    ></p>
                    <FontAwesomeIcon icon={faInfoCircle} />
                    Must match the first password input field.
                </Form.Group>
                
                <Form.Text ref={errRef}
                className={errMsg ? "errmsg" : "offscreen"}
                aria-live="assertive">
                    {errMsg}
                </Form.Text>
                    
                
                <Button colorScheme='blue' type="submit" 
                >
                    Submit
                </Button>
            </Form>
        </Container>
    )
}

export default Register