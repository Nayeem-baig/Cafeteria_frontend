import React from "react";
import { Col, Container, Navbar, Row } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import { Link, useNavigate } from "react-router-dom";
import AdminNavi from "./AdminNavi";
import { Button } from "react-bootstrap";
import ButtonGroup from 'react-bootstrap/ButtonGroup';

const AdminButtons = () => {
  const navigate = useNavigate();
  return (
    <div className="body">
      <AdminNavi />
      
      <Button onClick={() => navigate("/additems")} className="border border-secondary m-3" variant="primary">Add Product</Button>
      <Button onClick={() => navigate("/deleteitem")} className="border border-secondary m-3" variant="primary">Delete Product</Button>
      <Button onClick={() => navigate("/addcategory")} className="border border-secondary m-3" variant="primary">Add Category</Button>
      <Button onClick={() => navigate("/blockuser")} className="border border-secondary m-3" variant="primary">Block/Unblock delete user </Button>
    
    </div>
  );
};

export default AdminButtons;
