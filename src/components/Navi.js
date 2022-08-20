//bootstrap navbar
import { Link, NavLink, useNavigate } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import styles from "./Navi.css";
import React from 'react'
import { FaHeart } from "react-icons/fa";
import { BsFillCartCheckFill , BsFillBookmarkHeartFill , BsHouseFill , BsFillPersonFill } from "react-icons/bs";



const Navi = () => {
  return (
    <div className="">
        <Navbar className="bg-light"  expand="lg" fixed="top">
      <Container fluid>
        <Navbar.Brand > <p className="title">Cafeteria❞</p> </Navbar.Brand>
       <Navbar.Toggle  aria-controls="navbarScroll" />
       <Navbar.Collapse id="navbarScroll">
        <Nav
    className="me-auto"
          style={{  }}
           navbarScroll
         >
           <NavLink className='navItems' to={'/allcategory'} > <div><BsHouseFill/></div> Home </NavLink>
           <NavLink className='navItems' to={'/users/display_favourites'}><div><BsFillBookmarkHeartFill /></div>Favourites</NavLink>
           {/* <NavLink className='navItems' to={'/product/veg'}>Veg</NavLink> */}
           {/* <NavLink className='navItems' to={'/product/nonveg'}>Non veg</NavLink> */}
           <NavLink className='navItems' to={'/user/checkout'}> <div><BsFillCartCheckFill/></div>Cart</NavLink>
           <NavLink className='navItems' to={'/profile'}> <div><BsFillPersonFill/></div>Account</NavLink>
          </Nav>
        </Navbar.Collapse> 
      </Container> 
    </Navbar>
    </div>
  )
}

export default Navi


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
// import "./Admin/Header.css";

// const Navi = () => {
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

// export default Navi;
