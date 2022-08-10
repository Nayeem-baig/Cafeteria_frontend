import axios from "axios";
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";
import styles from "./Product.css";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navi from "./Navi";
import { Col, Row } from "react-bootstrap";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import { Link, NavLink, useNavigate } from "react-router-dom";

const Favourites = () => {
  const notify = (noti) =>
    toast.info(noti, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
    });
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const cartData = useSelector((state) => state?.CartReduser);
  console.log("cartData", cartData);
  const dispatch = useDispatch();
  const [favourites, setFavourites] = useState([]);
  let userFavs;
  let item;
  useEffect(() => {
    loadFavouritess();
    const unloadCallback = (event) => {
      event.preventDefault();
      event.returnValue = "";
      return "";
    };
    window.addEventListener("beforeunload", unloadCallback);
    return () => window.removeEventListener("beforeunload", unloadCallback);
  }, []);

  const loadFavouritess = async () => {
    var config = {
      method: "get",
      url: "http://localhost:4000/users/display_favourites",
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    axios(config)
      .then(function (response) {
        userFavs = response.data;
        setFavourites(userFavs);
        console.log("userFavs",userFavs)
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const removeFav = (product) => {
    var axios = require("axios");
    var data = JSON.stringify({
      id: product._id,
    });

    var config = {
      method: "delete",
      url: "http://localhost:4000/users/del_favourites",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        notify(product.name + " Removed from your favourites");
        console.log(JSON.stringify(response.data));
        window.location.reload(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const handlecart = (product) => {
    dispatch({ type: "ADD_PRODUCT_TO_CART", payload: product });
  };
  const removeCart = (product) => {
    dispatch({type: "REMOVE_PRODUCT_FROM_CART", payload : product})
  }
  console.log(favourites);
  function RenderFunc() {
    return (
      <div>
        <div>
        <Navi/>
        </div>
       <div className="titles">Favourites</div> 
        <Row>
        {favourites.length == 0  ? <h1 style={{margin:"50px"}}> Add items to Favourites! </h1> : 
        <div>{favourites.length > 0 &&
          favourites.map((product) => (
            <Col lg="3">
               <div>
              <Card className="wd-100" style={{ minWidth: "300px" }}>
                <Card.Body>
                  <Card.Img
                    className="card-img-top"
                    variant="top"
                    src={require("../assets/burger.jpg")}
                  />
                  <Card.Text>{product.name}</Card.Text>
                  <Card.Text>{`₹${product.price}`}</Card.Text>
                  <Card.Text>{product.veg ? "Veg" : "Non Veg"}</Card.Text>
                  <Card.Text>{product.description}</Card.Text>
                  <div>
                  {cartData.filter((d) => d._id == product._id).length === 1 ? (
                        <div className="btns">
                        <Button
                        onClick={() => removeCart(product._id) }
                        variant="light"
                        className="w-100 buttons">
                        Remove from cart
                    </Button>
                      </div>
                    ) : (
                      <Button
                      onClick={() => handlecart(product)}
                        variant="danger"
                        className="w-100 buttons"
                      >
                        Add to cart
                      </Button>
                    )}
                    
                      <Button
                        onClick={() => removeFav(product)}
                        variant="light"
                        className="w-100 buttons"
                      >
                        Remove from Favourites
                      </Button>
                  </div>
                </Card.Body>
              </Card>
            </div>
            </Col>
          ))}
          </div>
          }
          </Row>
        <ToastContainer />
      </div>
    );
  }
  return <RenderFunc />;
};
export default Favourites;
