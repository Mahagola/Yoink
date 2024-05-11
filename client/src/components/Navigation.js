import React from 'react'
import {Nav, Navbar, Container,NavDropdown, Button} from "react-bootstrap";
import {useSelector} from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap'
import {useSignOutUserMutation} from "../services/appApi"
import logo from '../assets/logo.png';
export default function Navigation() {
    const user = useSelector((state)=>state.user);
    const [signOutUser] = useSignOutUserMutation();
    async function handleSignOut(e){
        e.preventDefault();
        await signOutUser(user);
        window.location.replace("/");
    }
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
            <LinkContainer to="/">
                <Navbar.Brand>
                    <img src={logo} style={{width:50,height:50}} />
                </Navbar.Brand>
            </LinkContainer>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ms-auto">
                <LinkContainer to="/">
                    <Nav.Link>Home</Nav.Link>
                </LinkContainer>
                {!user && (
                    <LinkContainer to="/SignIn">
                        <Nav.Link>SignIn</Nav.Link>
                    </LinkContainer>
                )}
                <LinkContainer to="/Chat">
                    <Nav.Link>Chat</Nav.Link>
                </LinkContainer>
                {user &&(
                    <NavDropdown title=
                    {
                        <>
                            <img src={user.picture} style={{width:30,height:30,marginRight:10,objectFit:'cover',borderRadius:"50%"}}/>
                            {user.name}
                        </>
                    } id="basic-nav-dropdown">
                        <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.4">
                            <Button variant="danger" onClick={handleSignOut}>SignOut</Button>
                        </NavDropdown.Item>
                    </NavDropdown>
                )}
                </Nav>
            </Navbar.Collapse>
        </Container>
    </Navbar>
  );
}
