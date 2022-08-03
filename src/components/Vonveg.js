import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
const Nonveg = () => {
  const [product, setProduct] = useState([]);
  const navigate = useNavigate();
  let item;

  useEffect(() => {
    // if (product?.lenght === 0) {
    loadProducts();
    // }
  }, []);
  console.log("produuct", product);

  const token = localStorage.getItem("token");

  const loadProducts = async () => {
    var config = {
      method: "get",
      url: "http://localhost:4000/product/nonveg",
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
  function handleFav() {
    navigate("users/display_favourites");
  }
  function addToCart({x}){
    console.log("clicked add to cart "+ ( JSON.stringify(x) ));
}
  function RenderFunc() {
    return (
      <div>
        Nonveg Products
        <ul>
          <li>
            {" "}
            <NavLink to="/product">View All</NavLink> <t />
          </li>
        </ul>
        {product.length > 0 &&
          product.map((x) => (
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
export default Nonveg;
