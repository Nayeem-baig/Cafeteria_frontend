import axios from 'axios';
import React from 'react'


import { useState } from "react";

const AddItem = () => {
  const [selects , setSelects] = useState([]);
  const [addItem, setAddItem] = useState({
    name: "",
    description: "",
    price: "",
    veg: "",
    category: "",
  });
  const handleInput = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setAddItem({ ...addItem, [name]: value });
  };
  const handleSubmit = (event) => {
    const newRecord = { ...addItem };
    console.log(newRecord);
  };
  const PostData = async (event) => {
    event.preventDefault();
    const { name , description,price,veg, category , recommended} = addItem;
console.log(addItem)
    var data = JSON.stringify({
        name:name,
        description:description,
        price:price,
        veg:veg,
        category:category,
        recommended:recommended
        
      });
      const token = localStorage.getItem("token")
      var config = {
        method: 'post',
        url: 'http://localhost:4000/product/add',
        headers: { 
          'Authorization': 'Bearer ' + token, 
          'Content-Type': 'application/json'
        },
        data : data
      };
      
      axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
    console.log(selects.toString)  
  };
  return (
    <div className="container">
      <form method="post" className="container" onSubmit={handleSubmit}>
        <div className="logo">
          <h1>Add item</h1>
        </div>
        <div>
          <input
            type="text"
            value={addItem.name}
            onChange={handleInput}
            name="name"
            id="name"
            placeholder="item name"
            autoComplete="on"
          ></input>
        </div>
        <div>
          <input
            type="text"
            onChange={handleInput}
            value={addItem.description}
            name="description"
            id="description"
            placeholder="description"
            autoComplete="on"
          ></input>
        </div>
        <div>
          <input
            type="number"
            onChange={handleInput}
            value={addItem.price}
            name="price"
            id="price"
            placeholder="price"
            autoComplete="on"
          ></input>
        </div>
        <div>
        <label> Category </label>  
        <select>
        <option value = "pizza"> Pizza
        </option>  
        <option value = "pasta"> Pasta   
        </option>
        </select>  
        </div>

        <div>
        <label> Veg non veg </label>  
        <select value={selects} onChange={e=>setSelects(e.target.value)}>  
        <option value = "0"> Non Veg   
        </option>  
        <option value = "1"> Veg
        </option>
        </select>  
        </div>
      
        <div>
        <label> Recommended </label>  
        <select>  
        <option value = "1"> Yes
        </option>  
        <option value = "0"> No
        </option>
        </select>  
        </div>
        <button id="add" onClick={PostData}>
          AddItem
        </button>
      </form>
    </div>
  );
}

export default AddItem