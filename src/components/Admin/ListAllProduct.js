import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Row, Col } from "reactstrap";
import AdminNavi from "./AdminNavi";

const ListAllProduct = () => {
  const token = localStorage.getItem("token");
  const [recommended, setRecommended] = useState([]);
  let userFavs;
  // const [favourites, setFavourites] = useState([]);

  useEffect(() => {
    loadProducts();
    loadrecommended();
    const unloadCallback = (event) => {
      event.preventDefault();
      event.returnValue = "";
      return "";
    };
  }, []);

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

  function RenderFunc() {
    return (
      <div className="wd-100">
        <AdminNavi/>
        <div className="active">
          <p className="titles margin-top-10">All products</p>
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
                      <Card.Text className="text">ID: {product._id}</Card.Text>
                      <Card.Text className="text">{product.name}</Card.Text>
                      <Card.Text className="text">{`₹${product.price}`}</Card.Text>
                      <Card.Text className="text">
                        {product.veg ? (
                          <img
                            className="card-img-icon"
                            variant="top"
                            src={require("../Admin/assets/veg.jpg")}
                          />
                        ) : (
                          <img
                            src={require("../Admin/assets/nonveg.jpg")}
                            className="card-img-icon"
                          />
                        )}
                      </Card.Text>
                      <Card.Text className="text">
                        {product.description}
                      </Card.Text>
                      {/* {console.log("product",product)} */}
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
export default ListAllProduct;
