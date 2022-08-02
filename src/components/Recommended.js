import axios from "axios";
import React, { useEffect, useState } from "react";

const Recommended = () => {
  const [recommended, setRecommended] = useState([]);
  let userFavs;
  let item
  useEffect(() => {
      loadFavouritess();
  },[] );
 
  const loadFavouritess = async () => {
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
    
    console.log(recommended);
  return <div>
  Recommended
  {recommended.length > 0 && recommended.map(
    x => <div>
      <p>Name: {x.name}</p>
      <p>{x.description}</p>
      <p>Price: {x.price}</p>
      <p>Category: {x.category}</p>
      <p>{x.veg ? "Veg" : "Non Veg"}</p>
      </div>
    )}
</div>
};
export default Recommended;