import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Checkout from "./Checkout_btn";
import styles from "./UserCart.css";
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
  const handlecart = (x) => {
    dispatch({ type: "REMOVE_PRODUCT_FROM_CART", payload: x });
    // dispatch({ type: "ADDED" , payload:x });
    console.log(x);
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
    <div>
      <div>
        <Navi />
       <div className="titles">
       Cart
        </div> 
        <Row>
        {cartData.length > 0 &&
          cartData.map((x) => (
            <Col lg="3">
            <div className="itemCont">
              <Card className="bgcard" style={{ minWidth: "400px" }}>
                <Card.Body>
                  <div className="itemCont">
                    <Card.Img
                      className="card-img-top"
                      variant="top"
                      src={require("../assets/burger.jpg")}
                    />
                  </div>
                  <div className="itemCont">
                    <Card.Text>{x.name}</Card.Text>
                  </div>
                  <div className="itemCont">
                    <Card.Text>{`₹${x.price}`}</Card.Text>
                  </div>
                  <div className="itemCont">
                    <Card.Text>{x.veg ? "Veg" : "Non Veg"}</Card.Text>
                  </div>
                  <div className="itemCont">
                    <Card.Text>{x.description}</Card.Text>
                  </div>
                  <div>
                    <Card.Text>Total quantity: {x.cartQuantity}</Card.Text>
                  </div>
                  <div className="buttons">
                    <div className="btns">
                      <Button
                        onClick={() => increase(x._id)}
                        variant="danger"
                        className="w-100"
                      >
                        +
                      </Button>
                      <div> {x.cartQuantity}</div>
                      {x.cartQuantity-1 ? <Button
                        onClick={() => decrease(x._id)}
                        variant="danger"
                        className="w-100"
                      >
                        -
                      </Button>:
                      <Button
                      onClick={() => handlecart(x._id)}
                      variant="danger"
                      className="w-100"
                    >
                      -
                    </Button>
                      }
                     
                    </div>
                    <Button
                      onClick={() => handlecart(x._id)}
                      variant="danger"
                      className="w-100"
                    >
                      Remove{" "}
                    </Button>
                  </div>
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
