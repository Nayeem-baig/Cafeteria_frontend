import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Checkout from "./Checkout_btn";
import Navbar from "react-bootstrap/Navbar";
import { Col, Row } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import formatDistance from "date-fns/formatDistance";
import AdminNavi from "./Admin/AdminNavi";

const Orderhistory = () => {
  const token = localStorage.getItem("token");
  const [users, setUsers] = useState("");
  useEffect(() => {
    loadAllUsers();
  }, []);
  function conDate(dateNo) {
    const dateStr = dateNo;
    const str = formatDistance(new Date(dateStr), new Date());
    return <h3>{str} ago.</h3>;
  }

  function loadAllUsers() {
    var axios = require("axios");

    var config = {
      method: "get",
      url: "http://localhost:4000/users/listAllUsers",
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        setUsers(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <div>
      <AdminNavi />
      <div className="titles margin-top-10 mb-2">User list</div>
      <Col lg="12">
                <Card className="bgcard w-100 p-3 m-0">
                  <Card.Body className="d-flex align-items-center w-100 p-0 m-0">
                    <Col lg="2">
                      <Card.Text>Name</Card.Text>
                    </Col>
                    <Col lg="3">
                      <Card.Text>ID: </Card.Text>
                    </Col>
                    <Col lg="1">
                      <Card.Text>Role:</Card.Text>
                    </Col>
                    <Col lg="2">
                      <Card.Text>Email:</Card.Text>
                    </Col>
                 <Col lg="2">
                      <Card.Text>Status:</Card.Text>
                    </Col>
                  </Card.Body>
                </Card>
              </Col>
      {users.length > 0 &&
        users.map((user) => (
          <div>
            <Row>
              <Col lg="12">
                <Card className="bgcard w-100 p-3 m-0">
                  <Card.Body className="d-flex align-items-center w-100 p-0 m-0">
                    <Col lg="2">
                      <Card.Text>{user.name}</Card.Text>
                    </Col>
                    <Col lg="3">
                      <Card.Text>{user._id}</Card.Text>
                    </Col>
                    <Col lg="1">
                      <Card.Text>{user.role}</Card.Text>
                    </Col>
                    <Col lg="2">
                      <Card.Text>{user.email}</Card.Text>
                    </Col>
                    <Col lg="2">
                      <Card.Text>{user.blockstatus ? "Blocked" : "Unblocked"}</Card.Text>
                    </Col>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </div>
        ))}
    </div>
  );
};

export default Orderhistory;
