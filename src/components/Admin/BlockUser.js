import axios from "axios";
import React, { useEffect } from "react";
import { Button } from "react-bootstrap";
import styles from "../Register.css";
import { useState } from "react";
import { id } from "date-fns/locale";
import { collapseToast, toast } from "react-toastify";
import AdminNavi from "./AdminNavi";

const BlockUser = () => {
  const [addItem, setAddItem] = useState({
    id: "",
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
  const Block = async (event) => {
    event.preventDefault();
    const { id } = addItem;
    if (id === "") {
        return toast.warn("Enter item ID to complete action!")
    }
    var data = JSON.stringify({
      id: id,
    });
    console.log(data);

    const token = localStorage.getItem("token");
    if (id === "") {
      return toast.warn("Enter item ID to complete action!");
    }
    var config = {
      method: "patch",
      url: "http://localhost:4000/users/blockUser",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        toast(response.data);
        window.location.reload(false);
        // setAddItem(" ")
      })
      .catch(function (error) {
        console.log(error);
        toast.error(error.response.data);
      });
  };
   const Delete = async (event) => {
    event.preventDefault();
    const { id } = addItem;
    if (id === "") {
        return toast.warn("Enter item ID to complete action!")
    }
    var data = JSON.stringify({
      id: id,
    });
    console.log(data);

    const token = localStorage.getItem("token");
    if (id === "") {
      return toast.warn("Enter item ID to complete action!");
    }
    var config = {
      method: "delete",
      url: "http://localhost:4000/users/delete",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        toast(response.data);
        window.location.reload(false);
        // setAddItem(" ")
      })
      .catch(function (error) {
        console.log(error);
        toast.error(error.response.data);
      });
  };
  return (
    <div className="loginbody">
      <AdminNavi/>  
      <form method="post" className="Auth-form bodyCon" onSubmit={handleSubmit}>
        <div className="logo">
          <h4> Block/unblock or delete user.</h4>
        </div>
        <div>
          <input
            type="text"
            className="form-control mt-1 mb-3"
            value={addItem.id}
            ref={id}
            onChange={handleInput}
            name="id"
            id="id"
            placeholder="User ID"
            autoComplete="off"
          ></input>
        </div>
        <div className="d-flex flex-column">

        <Button className="wd-100 mt-3" onClick={Block}>
          Block / Unblock
        </Button>
      <Button className="wd-100 mt-3" onClick={Delete}>
          Delete
        </Button>
        </div>
      </form>
    </div>
  );
};

export default BlockUser;