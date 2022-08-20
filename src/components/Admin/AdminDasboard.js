import React, { useEffect, useState } from "react";
import { Col, Container, Navbar, Row } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import { Link, useNavigate } from "react-router-dom";
import AdminNavi from "./AdminNavi";
import { Button } from "react-bootstrap";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import AdminButtons from "./ActionButtons";
import formatDistance from "date-fns/formatDistance";

const AdminDasboard = () => {
  const [orders, setOrders] = useState("");
  let username;

  useEffect(() => {
    loadorders();
  }, []);
  const navigate = useNavigate();

  function loadorders() {
    const token = localStorage.getItem("token");
    var axios = require("axios");

    var config = {
      method: "get",
      url: "http://localhost:4000/orders/listallorder",
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    axios(config)
      .then(function (response) {
        // console.log(JSON.stringify(response.data));
        setOrders(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function conDate(dateNo) {
    const dateStr = dateNo;
    const str = formatDistance(new Date(dateStr), new Date());
    return <h3>{str} ago.</h3>;
  }
  function getname(product) {
    var axios = require("axios");
    var data = JSON.stringify({
      uid: product.orderedBy,
    });

    var config = {
      method: "get",
      url: "http://localhost:4000/users/getuser",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  
  return username
  }
  return (
    <div className="">
      <AdminNavi />
      {/* <AdminButtons/> */}
      <h1 className="margin-top-10 title">Orders</h1>
      {/* {console.log(orders)} */}
      {orders.length > 0 &&
        orders.map((product) => (
          <div>
            <div>{conDate(product.createdAt)}</div>
            <div>{product.orderedBy}</div>
            <div>Total order value :{product.total}/-</div>
            <Row>
              {product.items.length > 0 &&
                product.items.map((product) => (
                  <Col lg="12">
                    <div className="m-0 p-0 ">
                      <Card className="bgcard w-100 p-0 m-0">
                        <Card.Body className="d-flex align-items-center w-100 p-0 m-0">
                          <Row className="w-100">
                            <Col lg="2" className="text">
                              <Card.Img
                                className="card-img-top card-img-cart"
                                variant="top"
                                src={product.img}
                              />
                            </Col>
                            <Col
                              lg="2"
                              className=" d-flex justify-content-center align-items-center"
                            >
                              <Card.Text>{product.name}</Card.Text>
                            </Col>
                            <Col
                              lg="2"
                              className=" d-flex justify-content-center align-items-center"
                            >
                              <Card.Text>{`₹${product.price}/-`}</Card.Text>
                            </Col>
                            <Col
                              lg="1"
                              className=" d-flex justify-content-center align-items-center"
                            >
                              {product.veg ? (
                                <img
                                  className="card-img-icon"
                                  variant="top"
                                  src={require("../Admin/assets/veg.jpg")}
                                />
                              ) : (
                                <img
                                  src={require("../Admin/assets/nonveg.jpg")}
                                  className="card-img-icon"
                                />
                              )}
                            </Col>
                            <Col
                              lg="2"
                              className="itemCont d-flex justify-content-center align-items-center"
                            >
                              <Card.Text className="text">
                                Quantity : {product.cartQuantity}
                              </Card.Text>
                            </Col>
                          </Row>
                        </Card.Body>
                      </Card>
                    </div>
                  </Col>
                ))}
            </Row>
          </div>
        ))}
    </div>
  );
};

export default AdminDasboard;

//import useState hook to create menu collapse state
// import React, { useState } from "react";

// //import react pro sidebar components
// import {
//   ProSidebar,
//   Menu,
//   MenuItem,
//   SidebarHeader,
//   SidebarFooter,
//   SidebarContent,
// } from "react-pro-sidebar";

// //import icons from react icons
// import { FaList, FaRegHeart } from "react-icons/fa";
// import {
//   FiHome,
//   FiLogOut,
//   FiArrowLeftCircle,
//   FiArrowRightCircle,
// } from "react-icons/fi";
// import { RiPencilLine } from "react-icons/ri";
// import { BiCog } from "react-icons/bi";

// //import sidebar css from react-pro-sidebar module and our custom css
// import "react-pro-sidebar/dist/css/styles.css";
// import "./Header.css";

// const AdminDasboard = () => {
//   //create initial menuCollapse state using useState hook
//   const [menuCollapse, setMenuCollapse] = useState(false);

//   //create a custom function that will change menucollapse state from false to true and true to false
//   const menuIconClick = () => {
//     //condition checking to change state from true to false and vice versa
//     menuCollapse ? setMenuCollapse(false) : setMenuCollapse(true);
//   };

//   return (
//     <>
//       <div id="header">
//         {/* collapsed props to change menu size using menucollapse state */}
//         <ProSidebar collapsed={menuCollapse}>
//           <SidebarHeader>
//             <div className="logotext">
//               {/* small and big change using menucollapse state */}
//               <p>{menuCollapse ? "Logo" : "Big Logo"}</p>
//             </div>
//             <div className="closemenu" onClick={menuIconClick}>
//               {/* changing menu collapse icon on click */}
//               {menuCollapse ? <FiArrowRightCircle /> : <FiArrowLeftCircle />}
//             </div>
//           </SidebarHeader>
//           <SidebarContent>
//             <Menu iconShape="square">
//               <MenuItem  icon={<FiHome />}>Home</MenuItem>
//               <MenuItem icon={<FaList />}>Category</MenuItem>
//               <MenuItem icon={<FaRegHeart />}>Favourite</MenuItem>
//               <MenuItem icon={<RiPencilLine />}>Author</MenuItem>
//               <MenuItem icon={<BiCog />}>Settings</MenuItem>
//             </Menu>
//           </SidebarContent>
//           <SidebarFooter>
//             <Menu iconShape="square">
//               <MenuItem icon={<FiLogOut />}>Logout</MenuItem>
//             </Menu>
//           </SidebarFooter>
//         </ProSidebar>
//       </div>
//     </>
//   );
// };

// export default AdminDasboard;