import React from "react";
import { Col, Container, Navbar, Row } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import { Link, useNavigate } from "react-router-dom";
import AdminNavi from "./AdminNavi";
import { Button } from "react-bootstrap";
import AdminButtons from "./ActionButtons";
import { motion } from "framer-motion";

const AdminActions = () => {
  const navigate = useNavigate();
  return (
    <motion.div 
    initial={{opacity:0}}
    animate={{opacity:1}}
    transition={{duration:0.5}}
    exit={{opacity:0}}
    >
    <div className="body">
      <AdminNavi />
      <AdminButtons/>
    </div>
    </motion.div>
  );
};

export default AdminActions;