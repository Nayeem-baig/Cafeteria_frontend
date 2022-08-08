import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Checkout from "./Checkout_btn"
import styles from "./UserCart.css"
import Navbar from 'react-bootstrap/Navbar';
import { Nav } from "react-bootstrap";
import Container from 'react-bootstrap/Container';
import Navi from "./Navi";

const UserCart = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
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
    return () => window.removeEventListener("beforeunload", unloadCallback);
  }, [cartData]);


  const handlecart = (x) => {
    dispatch({ type: "REMOVE_PRODUCT_TO_CART", payload: x.x._id});
    console.log(x.x._id)
  };
  return (
    <div >
    <div>
    <Navi/>
    <div>
    </div>
      Cart
      {cartData.length > 0 &&
        cartData.map((x) => (
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
                <div className="buttons">
                  <Button
                    onClick={() => handlecart({ x })}
                    variant="danger"
                    className="w-100"
                  >
                    Remove{" "}
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </div>
        ))}
    </div>
    <Checkout/>
    </div>
  );
};

export default UserCart;
