//bootstrap navbar
import { Link, NavLink, useNavigate } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import styles from "./Navi.css";



import React from 'react'

const Navi = () => {
  return (
    <div>
        <Navbar className="container sticky " bg="light" expand="lg" fixed="top">
      <Container fluid>
        <Navbar.Brand>Online Menu</Navbar.Brand>
       <Navbar.Toggle  aria-controls="navbarScroll" />
       <Navbar.Collapse id="navbarScroll">
        <Nav
    className="me-auto my-2 my-lg-0"
          style={{  }}
           navbarScroll
         >
           <NavLink className='navItems' to={'/product'} >Home</NavLink>|
           <NavLink className='navItems' to={'/users/display_favourites'}>Favourites</NavLink>| 
           <NavLink className='navItems' to={'/product/nonveg'}>Non Veg</NavLink>|
           <NavLink className='navItems' to={'/product/veg'}>Veg</NavLink>|
           <NavLink className='navItems' to={'/user/checkout'}>Cart</NavLink>|
           <NavLink className='navItems' to={'/profile'}>Account</NavLink>
          </Nav>
        </Navbar.Collapse> 
      </Container> 
    </Navbar>
    </div>
  )
}

export default Navi