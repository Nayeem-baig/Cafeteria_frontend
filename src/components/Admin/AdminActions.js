import React from "react";
import { Col, Container, Navbar, Row } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import { Link, useNavigate } from "react-router-dom";
import AdminNavi from "./AdminNavi";
import { Button } from "react-bootstrap";
import AdminButtons from "./ActionButtons";

const AdminActions = () => {
  const navigate = useNavigate();
  return (
    <div className="body">
      <AdminNavi />
      <AdminButtons/>
    </div>
  );
};

export default AdminActions;