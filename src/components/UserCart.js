import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Checkout from "./Checkout_btn";
import styles from "./Product.css";
import Navbar from "react-bootstrap/Navbar";
import { Col ,Row } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Navi from "./Navi";

const UserCart = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const updates = useSelector((state) => state?.UpdatesReduser);
  const cartData = useSelector((state) => state?.CartReduser);

  useEffect(() => {
    const unloadCallback = (event) => {
      event.preventDefault();
      event.returnValue = "";
      return "";
    };
    window.addEventListener("beforeunload", unloadCallback);
    if (cartData.length === 0) {
      alert("Your cart is empty! Add items to view");
      navigate("/product");
    }
    setTimeout(() => {
      dispatch({type:'CLEAR_UPDATES'})
    }, 1000);
    return () => window.removeEventListener("beforeunload", unloadCallback);
  }, [cartData, updates]);

  console.log("cartData", cartData);
  const handlecart = (product) => {
    dispatch({ type: "REMOVE_PRODUCT_FROM_CART", payload: product });
    // dispatch({ type: "ADDED" , payload:product });
    console.log(product);
  };
  const increase = (productId) => {
    dispatch({ type: "ADD", payload: productId });
    dispatch({ type: "ADDED", payload: productId });
  };
  const decrease = (productId) => {
    dispatch({ type: "SUB", payload: productId });
    dispatch({ type: "ADDED", payload: productId });
  };
  return (
    <div className="p-0 m-0">
      <div>
        <Navi />
       <div className="titles">
       Cart
        </div> 
        <Row>
        {cartData.length > 0 &&
          cartData.map((product) => (
            <Col lg="12">
            <div className="m-0 p-0 ">
              <Card className="bgcard w-100 p-0 m-0">
                <Card.Body className="d-flex align-items-center w-100 p-0 m-0">
                  <Row className="w-100">
                  <Col lg="2" className="text">
                    <Card.Img
                      className="card-img-top card-img-cart"
                      variant="top"
                      src={require("../assets/burger.jpg")}
                    />
                  </Col>

                  <Col lg="3" className=" d-flex justify-content-center align-items-center">
                    <Card.Text>{product.name}</Card.Text>
                  </Col>
                  <Col lg="1" className=" d-flex justify-content-center align-items-center">
                    <Card.Text>{`₹${product.price}`}</Card.Text>
                  </Col>
                  <Col lg="1" className=" d-flex justify-content-center align-items-center">
                  {product.veg ?    
                        <img
                        className="card-img-icon"
                        variant="top"
                        src={require("../assets/veg.jpg")}
                      /> :    <img
                      src={require("../assets/nonveg.jpg")}
                      className="card-img-icon"
                    />}
                  </Col>
                  <Col lg="2" className="itemCont d-flex justify-content-center align-items-center">
                  <Card.Text className="text">{product.description}</Card.Text>
                  </Col>
                  <Col lg="2" className="itemCont d-flex justify-content-center align-items-center">
                    <div className="buttons">
                    <div className="btns">
                      <Button
                        onClick={() => increase(product._id)}
                        variant="light"
                        className="incdec"
                      >
                        +
                      </Button>
                      <div> {product.cartQuantity}</div>
                      {product.cartQuantity-1 ? <Button
                        onClick={() => decrease(product._id)}
                        variant="light"
                        className="incdec"
                      >
                        -
                      </Button>:
                      <Button
                      onClick={() => handlecart(product._id)}
                      variant="light"
                      className=""
                    >
                      -
                    </Button>
                      }
                    </div>
                    <Button
                      onClick={() => handlecart(product._id)}
                      variant="danger"
                      className="w-100"
                    >
                      Remove{" "}
                    </Button>
                    </div>
                  </Col>
                  </Row>
                 
                </Card.Body>
              </Card>
            </div>
            </Col>
          ))}
      </Row>
      </div>
      <Checkout />
    </div>
  );
};

export default UserCart;
