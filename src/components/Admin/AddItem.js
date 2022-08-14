import axios from "axios";
import React, { useEffect } from "react";
import { Button } from "react-bootstrap";
import styles from "../Register.css";

import { useState } from "react";

const AddItem = () => {
  const [category, setCategory] = useState([]);
  let allcategories;
  useEffect(() => {
    loadCategory();
  }, []);

  const loadCategory = async () => {
    const token = localStorage.getItem("token");
    var axios = require("axios");

    var config = {
      method: "get",
      url: "http://localhost:4000/category/list",
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    axios(config)
      .then(function (response) {
        allcategories = response.data;
        setCategory(allcategories);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const [selects, setSelects] = useState(0);
  const [selectCat, setSelectCat] = useState("pasta");
  const [selectRec, setSelectRec] = useState(0);
  const [addItem, setAddItem] = useState({
    name: "",
    description: "",
    price: "",
    img:""
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
    const { name, description, price, veg,category, recommended , img} = addItem;
    var data = JSON.stringify({
      name: name,
      description: description,
      price: price,
      veg: selects,
      category: selectCat,
      recommended:selectRec,
      img:img,
    });
    console.log(data);

    const token = localStorage.getItem("token");
    var config = {
      method: "post",
      url: "http://localhost:4000/product/add",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        alert(response.data);
        window.location.reload(false);
      })
      .catch(function (error) {
        console.log(error);
        alert(error);
      });

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
            autoComplete="off"
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
            autoComplete="off"
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
            autoComplete="off"
          ></input>
        </div>
        <div>
          <label> Category </label>
          <select value={selectCat} onChange={(e) => setSelectCat(e.target.value)}>
            {category.length > 0 &&
              category.map((x) => <option>{x.name}</option>)}
          </select>
        </div>

        <div>
          <label> Veg non veg </label>
          <select value={selects} onChange={(e) => setSelects(e.target.value)}>
            <option value="0"> Non Veg</option>
            <option value="1"> Veg</option>
          </select>
        </div>

        <div>
          <label> Recommended </label>
        <select value={selectRec} onChange={(e) => setSelectRec(e.target.value)}>
            <option value="0"> No</option>
            <option value="1"> Yes</option>
          </select>
        </div>
        <div>
          <input
            type="text"
            onChange={handleInput}
            value={addItem.img}
            name="img"
            id="img"
            placeholder="Image link"
            autoComplete="off"
          ></input>
        </div>
        <Button className="button" onClick={PostData}>
          Add Item
        </Button>
      </form>
    </div>
  );
};

export default AddItem;
