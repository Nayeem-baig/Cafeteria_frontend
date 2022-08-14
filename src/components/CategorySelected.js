import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import Image from "react-bootstrap/Image";
import styles from "./Product.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from 'react-bootstrap/Navbar';
import { Nav } from "react-bootstrap";
import Container from 'react-bootstrap/Container';
import { Row, Col } from "reactstrap";
import Navi from "./Navi";
const CategorySelected = () => {
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
  const alreadyFavourites = useSelector((state) => state?.FavouritesReduser);
  const updates = useSelector((state) => state?.UpdatesReduser);
  const selectedCategory = useSelector((state) => state?.SelectCategory);
  console.log("selectedCategory" , selectedCategory)
  const [favourites, setFavourites] = useState([]);
  console.log("cartData", cartData);
  const dispatch = useDispatch();
  const [product, setProduct] = useState([]);
  const navigate = useNavigate();
  let item;
  let userFavs;

  useEffect(() => {
    console.log(selectedCategory)
    loadProducts(selectedCategory);
    loadFavouritess();
    const unloadCallback = (event) => {
      event.preventDefault();
      event.returnValue = "";
      return "";
    };
    window.addEventListener("beforeunload", unloadCallback);
    setTimeout(() => {
      dispatch({type:'CLEAR_UPDATES'})
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
        userFavs = response.data;
        setFavourites(userFavs);
        console.log("userFavs",userFavs)
      })
      .catch(function (error) {
        console.log(error);
      });
  };


  const token = localStorage.getItem("token");
  function handleFav(x) {
    var axios = require("axios");
    var data = JSON.stringify({
      id: x._id,
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
        console.log(JSON.stringify(response.data));
        notify(x.name +" Added to favourites");
      })
      .catch(function (error) {
        if ((error = 409)) {
          console.log("Item already in fav");
        } else console.log(error);
      });
  }

  const loadProducts = async (selectCat) => {
    console.log("selectCat", selectCat )
    if ( selectCat === "burgers") {
        var config = {
            method: "get",
            url: "http://localhost:4000/product/burger",
            headers: {
              Authorization: "Bearer " + token,
            },
          };
      
          axios(config)
            .then(function (response) {
              item = response.data;
              setProduct(item);
              console.log(item);
              return;
            })
            .catch(function (error) {
              console.log(error);
            });
        } else if (selectCat === "pizza"){
            var config = {
                method: "get",
                url: "http://localhost:4000/product/pizza",
                headers: {
                  Authorization: "Bearer " + token,
                },
              };
          
              axios(config)
                .then(function (response) {
                  item = response.data;
                  setProduct(item);
                  console.log("loaddeed", item);
                  return;
                })
                .catch(function (error) {
                  console.log(error);
                });
        }
    else if (selectCat === "pasta"){
            var config = {
                method: "get",
                url: "http://localhost:4000/product/pasta",
                headers: {
                  Authorization: "Bearer " + token,
                },
              };
          
              axios(config)
                .then(function (response) {
                  item = response.data;
                  setProduct(item);
                  console.log("loaddeed", item);
                  return;
                })
                .catch(function (error) {
                  console.log(error);
                });
        }
    else if (selectCat === "soups"){
            var config = {
                method: "get",
                url: "http://localhost:4000/product/soups",
                headers: {
                  Authorization: "Bearer " + token,
                },
              };
          
              axios(config)
                .then(function (response) {
                  item = response.data;
                  setProduct(item);
                  console.log("loaddeed", item);
                  return;
                })
                .catch(function (error) {
                  console.log(error);
                });
        }
     else if (selectCat === "sandwich"){
            var config = {
                method: "get",
                url: "http://localhost:4000/product/sandwich",
                headers: {
                  Authorization: "Bearer " + token,
                },
              };
          
              axios(config)
                .then(function (response) {
                  item = response.data;
                  setProduct(item);
                  console.log("loaddeed", item);
                  return;
                })
                .catch(function (error) {
                  console.log(error);
                });
        }
      else if (selectCat === "milkshake"){
            var config = {
                method: "get",
                url: "http://localhost:4000/product/milkshake",
                headers: {
                  Authorization: "Bearer " + token,
                },
              };
          
              axios(config)
                .then(function (response) {
                  item = response.data;
                  setProduct(item);
                  console.log("loaddeed", item);
                  return;
                })
                .catch(function (error) {
                  console.log(error);
                });
        }
       else if (selectCat === "mocktails"){
            var config = {
                method: "get",
                url: "http://localhost:4000/product/mocktails",
                headers: {
                  Authorization: "Bearer " + token,
                },
              };
          
              axios(config)
                .then(function (response) {
                  item = response.data;
                  setProduct(item);
                  console.log("loaddeed", item);
                  return;
                })
                .catch(function (error) {
                  console.log(error);
                });
        }
         else if (selectCat === "cakes"){
            var config = {
                method: "get",
                url: "http://localhost:4000/product/cakes",
                headers: {
                  Authorization: "Bearer " + token,
                },
              };
          
              axios(config)
                .then(function (response) {
                  item = response.data;
                  setProduct(item);
                  console.log("loaddeed", item);
                  return;
                })
                .catch(function (error) {
                  console.log(error);
                });
        }
           else if (selectCat === "beverages"){
            var config = {
                method: "get",
                url: "http://localhost:4000/product/beverages",
                headers: {
                  Authorization: "Bearer " + token,
                },
              };
          
              axios(config)
                .then(function (response) {
                  item = response.data;
                  setProduct(item);
                  console.log("loaddeed", item);
                  return;
                })
                .catch(function (error) {
                  console.log(error);
                });
        }
             else if (selectCat === "samosa"){
            var config = {
                method: "get",
                url: "http://localhost:4000/product/samosa",
                headers: {
                  Authorization: "Bearer " + token,
                },
              };
          
              axios(config)
                .then(function (response) {
                  item = response.data;
                  setProduct(item);
                  console.log("loaddeed", item);
                  return;
                })
                .catch(function (error) {
                  console.log(error);
                });
        }
    }

  function handleFav(x) {
    var axios = require("axios");
    var data = JSON.stringify({
      id: x._id,
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

        notify(x.name + " Added to favourites");
      })
      .catch(function (error) {
        if ((error = 409)) {
          notify("Something went wrong. Please try again.");
        } else console.log(error);
      });
  }
  function removeFav(x){
    var axios = require('axios');
    var data = JSON.stringify({
      "id": x
    });
    
    var config = {
      method: 'delete',
      url: 'http://localhost:4000/users/del_favourites',
      headers: { 
        'Authorization': 'Bearer '+ token, 
        'Content-Type': 'application/json'
      },
      data : data
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
  const removeCart = (product) => {
    dispatch({type: "REMOVE_PRODUCT_FROM_CART", payload : product})
  }
  const handlecart = (x) => {
    console.log(x);
    dispatch({ type: "ADD_PRODUCT_TO_CART", payload: x });
  };
  function RenderFunc() {
  return (
    <div>
          <div>
<Navi/>
    </div>
    <div className="titles">
      {selectedCategory}
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
                        {product.description}
                      </Card.Text>
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
};
return <RenderFunc />;
};
export default CategorySelected;