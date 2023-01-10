import axios from "axios";
import React, { useEffect } from "react";
import { Button } from "react-bootstrap";
import styles from "../Register.css";
import { useState } from "react";
import AdminButtons from "./ActionButtons";
import AdminNavi from "./AdminNavi";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

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

  const [selects, setSelects] = useState(1);
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
    if(name === ""){
      return toast.warn("Name required!")
    }
     if(description === ""){
      return toast.warn("Description required!")
    }
     if(price === ""){
      return toast.warn("Price required!")
    }
     if(img === ""){
      return toast.warn("Image link required!")
    }
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
        // window.location.reload(false);
        setAddItem({
          name: "",
          description: "",
          price: "",
          img:""
        });
        toast.success(name +" added successsully")
      })
      .catch(function (error) {
        console.log(error);
        toast.error(error);
      });

  };
  return (
    <motion.div 
    initial={{opacity:0}}
    animate={{opacity:1}}
    transition={{duration:0.2}}
    exit={{opacity:0}}
    >
    <div className="loginbody">
      <AdminNavi/>  
      <form method="post" className="Auth-form bodyCon" onSubmit={handleSubmit}>
        <div className="logo">
          <h1>Add item</h1>
        </div>
        <div>
          <input
            type="text"
            className="form-control mt-1 mb-3"
            value={addItem.name}
            onChange={handleInput}
            name="name"
            id="name"
            placeholder="Item name"
            autoComplete="off"
          ></input>
        </div>
        <div>
          <input
            type="text"
            className="form-control mt-1 mb-3"
            onChange={handleInput}
            value={addItem.description}
            name="description"
            id="description"
            placeholder="Description"
            autoComplete="off"
          ></input>
        </div>
        <div>
          <input
            className="form-control mt-1 mb-3"
            type="number"
            onChange={handleInput}
            value={addItem.price}
            name="price"
            id="price"
            placeholder="Price"
            autoComplete="off"
          ></input>
        </div>
        <div>
          <label> Category :</label>
          <select value={selectCat} onChange={(e) => setSelectCat(e.target.value)}>
            {category.length > 0 &&
              category.map((x) => <option>{x.name}</option>)}
          </select>
        </div>

        <div>
          <label> Type : </label>
          <select value={selects} onChange={(e) => setSelects(e.target.value)}>
            <option value="1"> Veg</option>
            <option value="0"> Non Veg</option>
          </select>
        </div>

        <div>
          <label> Recommended :</label>
        <select value={selectRec} onChange={(e) => setSelectRec(e.target.value)}>
            <option value="0"> No</option>
            <option value="1"> Yes</option>
          </select>
        </div>
        <div>
          <input
            type="text"
            className="form-control mt-1 mb-3"
            onChange={handleInput}
            value={addItem.img}
            name="img"
            id="img"
            placeholder="Image link"
            autoComplete="off"
          ></input>
        </div>
        <Button className="wd-100 mt-3" onClick={PostData}>
          Add Item
        </Button>
      </form>
    </div>
    </motion.div>
  );
};

export default AddItem;
