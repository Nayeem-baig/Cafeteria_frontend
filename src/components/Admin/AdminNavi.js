//bootstrap navbar
import { Link, Navigate, NavLink, useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import React from "react";
import { MdOutlinePendingActions } from "react-icons/md";
import { FcTodoList } from "react-icons/fc";
import {
  BsFillCartCheckFill,
  BsFillBookmarkHeartFill,
  BsHouseFill,
  BsFillPersonFill,
} from "react-icons/bs";

const AdminNavi = () => {
  const navigate = useNavigate();
  return (
    <div className="">
      <Navbar className="bg-light" expand="lg" fixed="top">
        <Container fluid>
          <Navbar.Brand>
            {" "}
            <p className="title">Cafeteria❞</p>{" "}
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
                  <Link to={"/deleteitem"}>Delete item</Link>
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
                <NavDropdown.Divider />
                <NavDropdown.Item>
                  <Link to={"/blockuser"}>Block/Unblock delete user </Link>
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
