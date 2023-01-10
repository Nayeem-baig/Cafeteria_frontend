import axios from "axios";
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import styles from "./Product.css";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navi from "./Navi";
import { Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { AiFillHeart } from "react-icons/ai";
import { ReactComponent as EmptyFav } from "../assets/emptyfav.svg";

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
  const dispatch = useDispatch();
  const [favourites, setFavourites] = useState([]);
  let userFavs;
  let item;
  useEffect(() => {
    loadFavouritess();
    // const unloadCallback = (event) => {
    //   event.preventDefault();
    //   event.returnValue = "";
    //   return "";
    // };
    // window.addEventListener("beforeunload", unloadCallback);
    // return () => window.removeEventListener("beforeunload", unloadCallback);
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
  const removeCart = (product) => {
    dispatch({ type: "REMOVE_PRODUCT_FROM_CART", payload: product._id });
    toast.warn(product.name + " removed from cart");
  };
  const handlecart = (product) => {
    dispatch({ type: "ADD_PRODUCT_TO_CART", payload: product });
    toast(product.name + " added to cart");
  };
  return (
    <motion.div
      className="body"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
      exit={{ opacity: 0 }}
    >
      <div className="body">
        {favourites.length === 0 ? (
          <div className="body">
            <Navi />
            <div className="titles margin-top-10">Favourites</div>
            <EmptyFav height={400} width={400} />
            <div className="titles">
              Oops you've not added any item to favourites!
            </div>
          </div>
        ) : (
          <div>
            <Navi />
            <div className="titles margin-top-10 mb-2">Favourites</div>
            <Row>
              {favourites.length > 0 &&
                favourites.map((product) => (
                  <Col className="mb-3" >
                    <div className="procon">
                      <Card
                        className="wd-100 d-flex"
                        style={{
                          minWidth: "300px",
                          maxWidth: "300px",
                          minHeight: "240px",
                        }}
                      >
                        <Card.Body>
                          <div className="d-flex">
                            <Card.Img
                              className="card-img-top"
                              variant="top"
                              style={{ minWidth: "100px", maxWidth: "100px" }}
                              src={product.img}
                            />
                            <div>
                              <Card.Text className="text bold p-1 m-0">
                                {product.name}
                              </Card.Text>
                              <Card.Text className="text p-0 m-0">
                                {`₹${product.price}`}/-
                              </Card.Text>
                              <div className="d-flex justify-content-between wd-100">
                                {product.veg ? (
                                  <img
                                    className="ml-2 card-img-icon"
                                    variant="top"
                                    src={require("../assets/veg.jpg")}
                                  />
                                ) : (
                                  <img
                                    src={require("../assets/nonveg.jpg")}
                                    className=" ml-2 card-img-icon"
                                  />
                                )}
                                <AiFillHeart
                                  style={{ size: "40px" }}
                                  className="heartIcon"
                                  onClick={() => removeFav(product)}
                                />
                              </div>
                            </div>
                          </div>
                          <Card.Text
                            className="p-0 m-0"
                            style={{
                              color: "#575653",
                              fontSize: "13px",
                              maxlines: "2",
                            }}
                          >
                            {product.description}
                          </Card.Text>
                          <div className="d-flex align-items-end">
                            {cartData.filter((d) => d.productID == product._id)
                              .length === 1 ? (
                              <Button
                                onClick={() => removeCart(product)}
                                variant="light"
                                className="w-100 buttons"
                              >
                                Remove from cart
                              </Button>
                            ) : (
                              <Button
                                onClick={() => handlecart(product)}
                                variant="danger"
                                className="w-100 buttons"
                              >
                                Add to cart
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
        )}
      </div>
    </motion.div>
  );
};

export default Favourites;
