import { Link, NavLink, useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import React from "react";
import { FcTodoList } from "react-icons/fc";
import {
  BsFillPersonFill,
} from "react-icons/bs";

const AdminNavi = () => {
  return (
    <div className="">
      <Navbar className="bg-light" expand="lg" fixed="top">
        <Container fluid>
          <Navbar.Brand>
            {" "}
            <p className="title">Admin Cafeteria❞</p>{" "}
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="me-auto" style={{}} navbarScroll>
              <NavLink className="navItems" to={"/admindasboard"}>
                {" "}
                <div>
                  <FcTodoList />
                </div>
                Orders {" "}
              </NavLink>
              <NavDropdown className="navItems" title="Actions">
                <NavDropdown.Item>
                  <Link to={"/additems"}>Add items</Link>
                </NavDropdown.Item>
             
                <NavDropdown.Item>
                  <Link to={"/addcategory"}>Add category</Link>
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item>
                  <Link to={"/listallproduct"}>List products</Link>
                </NavDropdown.Item>
                <NavDropdown.Item>
                  <Link to={"/listcategory"}>List category</Link>
                </NavDropdown.Item>
                <NavDropdown.Item>
                  <Link to={"/listusers"}>List users</Link>
                </NavDropdown.Item>
              </NavDropdown>
              <NavLink className="navItems" to={"/adminprofile"}>
                <div>
                  <BsFillPersonFill />
                </div>
                Account
              </NavLink>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default AdminNavi;
