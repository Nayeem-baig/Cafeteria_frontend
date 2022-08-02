import axios from "axios";
import React, { useEffect, useState } from "react";
import styles from "./favourites.module.css";
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
    
    console.log(favourites);
  return <div>
  Favourites
  {favourites.length > 0 && favourites.map(
    x => <div>
      <p>Name: {x.name}</p>
      <p>{x.description}</p>
      <p>Price: {x.price}</p>
      <p>Category: {x.category}</p>
      <p>Veg: {String(x.veg)}</p>
      </div>
    )}
</div>
};
export default Favourites;