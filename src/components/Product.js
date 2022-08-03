import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import styles from "./Product.css";
const Product = () => {
  const [recommended, setRecommended] = useState([]);
  let userFavs;
  useEffect(() => {
    loadrecommended();
  },[] );
 
  const loadrecommended = async () => {
   const token = localStorage.getItem("token")
   var axios = require('axios');

   var config = {
     method: 'get',
     url: 'http://localhost:4000/product/recommended',
     headers: { 
      'Authorization': 'Bearer ' + token
     }
   };
   
   axios(config)
   .then(function (response) {
    userFavs = response.data
    setRecommended(userFavs);
   })
   .catch(function (error) {
     console.log(error);
   });
   
    };      



  const [product, setProduct] = useState([]);
  const navigate = useNavigate();
  let item;

  useEffect(() => {
      loadProducts();
  }, []);


  const token = localStorage.getItem("token");

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
  
  function handleFav(){
    navigate('users/display_favourites')
  }
  function addToCart({x}){
      console.log("clicked add to cart "+ ( JSON.stringify(x) ));
  }
  function RenderFunc() {
    return (
      <div>
        Products
        <ul>
      <li> <NavLink to="/users/display_favourites">View favourites</NavLink> <t/></li>
      <li><NavLink to="/product/veg">Veg</NavLink></li>
      <li><NavLink to="/product/nonveg">Non Veg</NavLink></li>
      <li><NavLink to="/profile">Profile</NavLink></li>
      </ul>

          <div><p>Recommended</p></div>
      {recommended.length > 0 && recommended.map(
          x => <div>
            
             <Card className="bgcard" style={{ minWidth: '400px' }}>
   <Card.Body>
   <Card.Img className="card-img-top" variant="top" src={require("../assets/burger.jpg")} />
    <Card.Text>{x.name}</Card.Text>
    <Card.Text>{`₹${x.price}`}</Card.Text>
    <Card.Text>{(x.veg)  ? "Veg" : "Non Veg"}</Card.Text>
    <Card.Text>{x.description}</Card.Text>
    <div>
    <Button onClick={() => addToCart({x})} variant="danger" className="w-100 btns">Add to cart </Button>
    <Button variant="danger" className="w-100">Favourites </Button>
    </div>
   </Card.Body>
  </Card>
            </div>
          )}
        <div className="active"><p>All products</p></div>
        {product.length > 0 && product.map(
          x => <div>
             <Card className="bgcard" style={{ minWidth: '400px' }}>
   <Card.Body>
   <Card.Img className="card-img-top" variant="top" src={require("../assets/burger.jpg")} />
    <Card.Text>{x.name}</Card.Text>
    <Card.Text>{`₹${x.price}`}</Card.Text>
    <Card.Text>{(x.veg)  ? "Veg" : "Non Veg"}</Card.Text>
    <Card.Text>{x.description}</Card.Text>
    <div> 
    <Button onClick={() => addToCart({x})} variant="danger" className="w-100 btns">Add to cart </Button>
    <Button variant="danger" className="w-100">Favourites </Button>
    </div>
   </Card.Body>
  </Card>
          </div>
          )}
      </div>
    );
  }
  return <RenderFunc />;
};
export default Product;
