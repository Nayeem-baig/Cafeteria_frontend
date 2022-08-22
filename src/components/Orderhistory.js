import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Checkout from "./Checkout_btn";
import styles from "./Product.css";
import Navbar from "react-bootstrap/Navbar";
import { Col, Row } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Navi from "./Navi";
import formatDistance from "date-fns/formatDistance";
import { motion } from "framer-motion";

const Orderhistory = () => {
  const [orders, setOrders] = useState("");
  const [users, setUsers] = useState([]);
  const [totalamt, setTotal] = useState(0);
  useEffect(() => {
    loadAllUsers();
    loadOrderHistory();
  }, []);
  const token = localStorage.getItem("token");
  const totalAmount = useSelector((state) => state?.CartReduser);
  console.log("first", totalAmount);
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
  function conDate(dateNo) {
    const dateStr = dateNo;
    const str = formatDistance(new Date(dateStr), new Date());
    return <h3>{str} ago.</h3>;
  }

  function loadOrderHistory() {
    var axios = require("axios");
    var config = {
      method: "get",
      url: "http://localhost:4000/orders/orderhistory",
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    axios(config)
      .then(function (response) {
        // console.log(JSON.stringify(response.data));
        const uorders = response.data;
        setOrders(uorders);
        console.log(uorders);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <motion.div 
    initial={{opacity:0}}
    animate={{opacity:1}}
    transition={{duration:0.2}}
    exit={{opacity:0}}
    >
    <div>
      <Navi />
      <div className="titles margin-top-10 mb-2">Orderhistory</div>
      {orders.length > 0 &&
        orders.map((product) => (
          <div>
            <div>{conDate(product.createdAt)}</div>
            <div>Total order value :{product.total}/-</div>
            <Row>
              {product.items.length > 0 &&
                product.items.map((product) => (
                  <Col lg="12">
                    <div className="m-0 p-0 ">
                      <Card className="bgcard w-100 p-0 m-0">
                        <Card.Body className="d-flex align-items-center w-100 p-0 m-0">
                          <Row className="w-100">
                            <Col lg="2" className="text">
                              <Card.Img
                                className="card-img-top card-img-cart"
                                variant="top"
                                src={product.img}
                              />
                            </Col>
                            <Col
                              lg="2"
                              className=" d-flex justify-content-center align-items-center"
                            >
                              <Card.Text>{product.name}</Card.Text>
                            </Col>
                            <Col
                              lg="2"
                              className=" d-flex justify-content-center align-items-center"
                            >
                              <Card.Text>{`₹${product.price}/-`}</Card.Text>
                            </Col>
                            <Col
                              lg="1"
                              className=" d-flex justify-content-center align-items-center"
                            >
                              {product.veg ? (
                                <img
                                  className="card-img-icon"
                                  variant="top"
                                  src={require("../assets/veg.jpg")}
                                />
                              ) : (
                                <img
                                  src={require("../assets/nonveg.jpg")}
                                  className="card-img-icon"
                                />
                              )}
                            </Col>
                            <Col
                              lg="2"
                              className="itemCont d-flex justify-content-center align-items-center"
                            >
                              <Card.Text className="text">
                                Quantity : {product.cartQuantity}
                              </Card.Text>
                            </Col>
                          </Row>
                        </Card.Body>
                      </Card>
                    </div>
                  </Col>
                ))}
            </Row>
          </div>
        ))}
    </div>
    </motion.div>
  );
};

export default Orderhistory;
