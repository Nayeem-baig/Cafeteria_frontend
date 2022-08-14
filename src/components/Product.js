import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";
import styles from "./Product.css";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navi from "./Navi";
import Navbar from "react-bootstrap/Navbar";
import { Nav } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import CartReduser from "../redux/reducers/CartReduser";
import { Row, Col } from "reactstrap";


const Product = () => {
  const token = localStorage.getItem("token");
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
  const cartData = useSelector((state) => state?.CartReduser);
  var cartQuantity = useSelector((state) => state?.CartReduser);
  const favourites = useSelector((state) => state?.FavouritesReduser);
  console.log("cartdataaaaa", cartData);
  const updates = useSelector((state) => state?.UpdatesReduser);
  const dispatch = useDispatch();
  const [recommended, setRecommended] = useState([]);
  let userFavs;
  // const [favourites, setFavourites] = useState([]);

  useEffect(() => {
    loadProducts();
    loadrecommended();
    loadFavouritess();
    const unloadCallback = (event) => {
      event.preventDefault();
      event.returnValue = "";
      return "";
    };
    window.addEventListener("beforeunload", unloadCallback);
    setTimeout(() => {
      dispatch({ type: "CLEAR_UPDATES" });
    }, 1000);
    return () => window.removeEventListener("beforeunload", unloadCallback);
  }, [updates]);
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
        dispatch({ type: "GET_FAV_LIST", payload: response.data });
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const loadrecommended = async () => {
    var axios = require("axios");

    var config = {
      method: "get",
      url: "http://localhost:4000/product/recommended",
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    axios(config)
      .then(function (response) {
        userFavs = response.data;
        setRecommended(userFavs);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const [product, setProduct] = useState([]);
  const navigate = useNavigate();
  let item;

  const loadProducts = async () => {
    var config = {
      method: "get",
      url: "http://localhost:4000/product/all",
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    axios(config)
      .then(function (response) {
        item = response.data;
        setProduct(item);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  function handleFav(product) {
    var axios = require("axios");
    var data = JSON.stringify({
      id: product._id,
    });

    var config = {
      method: "post",
      url: "http://localhost:4000/users/add_favourites",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(response);
        dispatch({ type: "ADDED", payload: response.data });
        notify(product.name + " Added to favourites");
      })
      .catch(function (error) {
        if ((error = 409)) {
          notify("Something went wrong. Please try again.");
        } else console.log(error);
      });
  }

  function removeFav(product) {
    var axios = require("axios");
    var data = JSON.stringify({
      id: product,
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
        dispatch({ type: "REMOVE", payload: response.data });
        // console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  const handlecart = (product) => {
    dispatch({ type: "ADD_PRODUCT_TO_CART", payload: product });
    notify(product.name + "Added to your cart");
  };
  // const increase = (_id) =>{
  //   dispatch({type: "ADD", payload : _id})
  // }
  // const decrease = (_id) => {
  //   dispatch({type: "SUB", payload : _id})
  // }
  const removeCart = (product) => {
    dispatch({ type: "REMOVE_PRODUCT_FROM_CART", payload: product });
  };
  function RenderFunc() {
    return (
      <div>
        {localStorage.getItem("token") !== null && <Navi />}
        <div className="titles">
          Products
          <p>Recommended</p>
        </div>
        <Row>
          {recommended.length > 0 &&
            recommended.map((product) => (
              <Col lg="3">
                <div>
                  <Card
                    className="wd-100 flexRow"
                    style={{ minWidth: "300px" }}
                  >
                    <Card.Body>
                      <Card.Img
                        className="card-img-top"
                        variant="top"
                        src={product.img}
                      />
                      <Card.Text className="text">{product.name}</Card.Text>
                      <Card.Text className="text">{`₹${product.price}`}</Card.Text>
                      <Card.Text className="text">
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
                      </Card.Text>
                      <Card.Text className="text">
                        {product.description}
                      </Card.Text>
                      {/* {console.log("product",product)} */}
                      <div>
                        {cartData.filter((d) => d.productID == product._id).length ===
                        
                        1 ? (
                          <div className="btns">
                            <Button
                              onClick={() => removeCart(product._id)}
                              variant="light"
                              className="w-100 buttons"
                            >
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
                        {favourites.filter((d) => d._id === product._id)
                          .length === 1 ? (
                          <Button
                            onClick={() => removeFav(product._id)}
                            variant="light"
                            className="w-100 buttons"
                          >
                            Remove from Favourites
                          </Button>
                        ) : (
                          <Button
                            onClick={() => handleFav(product)}
                            variant="danger"
                            className="w-100 buttons"
                          >
                            Add to Favourites
                          </Button>
                        )}
                      </div>
                    </Card.Body>
                  </Card>
                </div>
              </Col>
            ))}
        </Row>
        <div className="active">
          <p className="titles">All products</p>
        </div>
        <Row>
          {product.length > 0 &&
            product.map((product) => (
              <Col lg="3">
                <div>
                  <Card
                    className="wd-100 flexRow"
                    style={{ minWidth: "300px" }}
                  >
                    <Card.Body>
                      <Card.Img
                        className="card-img-top"
                        variant="top"
                        src={product.img}
                      />
                      <Card.Text className="text">{product.name}</Card.Text>
                      <Card.Text className="text">{`₹${product.price}`}</Card.Text>
                      <Card.Text className="text">
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
                      </Card.Text>
                      <Card.Text className="text">
                        {product.description}
                      </Card.Text>
                      {/* {console.log("product",product)} */}
                      <div>
                        {cartData.filter((d) => d.productID == product._id).length ===
                        
                        1 ? (
                          <div className="btns">
                            <Button
                              onClick={() => removeCart(product._id)}
                              variant="light"
                              className="w-100 buttons"
                            >
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
                        {favourites.filter((d) => d._id === product._id)
                          .length === 1 ? (
                          <Button
                            onClick={() => removeFav(product._id)}
                            variant="light"
                            className="w-100 buttons"
                          >
                            Remove from Favourites
                          </Button>
                        ) : (
                          <Button
                            onClick={() => handleFav(product)}
                            variant="danger"
                            className="w-100 buttons"
                          >
                            Add to Favourites
                          </Button>
                        )}
                      </div>
                    </Card.Body>
                  </Card>
                </div>
              </Col>
            ))}
        </Row>
        <ToastContainer />
      </div>
    );
  }
  return <RenderFunc />;
};
export default Product;
