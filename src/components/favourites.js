import axios from "axios";
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Image from 'react-bootstrap/Image';
import { NavLink } from "react-router-dom";
import styles from "./Product.css";
const Favourites = () => {
  const [favourites, setFavourites] = useState([]);
  let userFavs;
  let item
  useEffect(() => {
      loadFavouritess();
  },[] );

  const loadFavouritess = async () => {
   const token = localStorage.getItem("token")
    var config = {
        method: 'get',
        url: 'http://localhost:4000/users/display_favourites',
        headers: { 
          'Authorization': 'Bearer ' + token
        }
      };
      
      axios(config)
      .then(function (response) {
        userFavs = response.data
        setFavourites(userFavs);
      })
      .catch(function (error) {
        console.log(error);
      });
    };      
    function addToCart({x}){
      console.log("clicked add to cart "+ ( JSON.stringify(x) ));
  }
    console.log(favourites);
    function RenderFunc() {
      return (
        <div>
          Veg Products
          <ul>
            <li>
              {" "}
              <NavLink to="/product">View All</NavLink> <t />
            </li>
          </ul>
          {favourites.length > 0 &&
            favourites.map((x) => (
              <div>
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
            ))}
        </div>
      );
    }
    return <RenderFunc />;
};
export default Favourites;