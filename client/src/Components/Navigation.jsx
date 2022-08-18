
import {Button, Container, Form, Nav, Navbar, NavDropdown} from "react-bootstrap";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css"
import {  
    Routes,
    Route,
    Link,
    useNavigate,
    useLocation,
    Navigate,
    Outlet } from "react-router-dom";
import gigaChad from "../gigachad.png"
import Login from "./Login";
import Dashboard from "./Dashboard";
import { useSelector } from 'react-redux';
import Logout from "./Logout";
import { useCookies } from 'react-cookie';
import Register from "./Register";

function Navigation() {
    const linda = useSelector((state) => state.appState.auth);
    const [cookies] = useCookies(['gigachad'])
    
    let gigaStyles = {
        height: "50px",
        width: "50px"
    }
    return (
        <Navbar bg="success" expand="lg">
            <Container fluid>
                <Navbar.Brand href="/">
                    <img style={gigaStyles} src={gigaChad}/>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>
                            <Nav.Link>
                                <Link to="/">Home</Link>
                            </Nav.Link>
                            <Nav.Link>
                                <Link to="/promotions">Promotions</Link>
                            </Nav.Link>
                            <Nav.Link>
                                <Link to="/dashboard">Dashboard</Link>
                            </Nav.Link>
                        </Nav>
                        <Link to="/register">
                            <Button variant="light" className="signUp">
                                Register
                            </Button>
                        </Link>
                        {cookies.gigachad && linda ? <Logout /> : <Login />}
                        {/* <Login /> */}
                    </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Navigation;