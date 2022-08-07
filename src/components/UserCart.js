import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Checkout from "./Checkout_btn"

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
    <div>
    <div>
      Cart
      {cartData.length > 0 &&
        cartData.map((x) => (
          <div>
            <Card className="bgcard" style={{ minWidth: "400px" }}>
              <Card.Body>
                <Card.Img
                  className="card-img-top"
                  variant="top"
                  src={require("../assets/burger.jpg")}
                />
                <Card.Text>{x.name}</Card.Text>
                <Card.Text>{`₹${x.price}`}</Card.Text>
                <Card.Text>{x.veg ? "Veg" : "Non Veg"}</Card.Text>
                <Card.Text>{x.description}</Card.Text>
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
