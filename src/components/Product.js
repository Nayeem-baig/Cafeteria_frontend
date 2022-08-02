import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from 'react-router-dom';
import styles from "./Products.module.css";
const Product = () => {
  const [product, setProduct] = useState([]);
  const navigate = useNavigate();
  let item;

  useEffect(() => {
    // if (product?.lenght === 0) {
      loadProducts();
    // }
  }, []);
  console.log("produuct",product)

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
        console.log(item);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  function handleFav(){
    navigate('users/display_favourites')
  }

  function RenderFunc() {
    return (
      <div>
        Products
        <ul>
      <li> <NavLink to="/users/display_favourites">View favourites</NavLink> <t/></li>
       <li><NavLink to="/recommended">Recommended</NavLink></li> 
        </ul>
        
        {product.length > 0 && product.map(
          x => <div>
            <p>Name: {x.name}</p>
            <p>{x.description}</p>
            <p>Price: {x.price}</p>
            <p>Category: {x.category}</p>
            <p>{x.veg ? "Veg" : "Non Veg"}</p>
            </div>
          )}
      </div>
    );
  }
  return <RenderFunc />;
};
export default Product;
