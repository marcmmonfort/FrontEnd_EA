import React from "react";
import "./footer.css";
import { Link } from 'react-router-dom';

import { useRef } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

const Footer = () => {
  return (
    <footer>
      <div className="footer-content">
        <p>2023 @lplan</p>
      </div>
    </footer>
  );
};

export default Footer;