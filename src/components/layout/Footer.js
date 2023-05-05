import React from "react";
import "../../styles/Footer.css";

const Footer = () => {
   return (
      <footer>
         <p className="footer-p">
            &copy; {new Date().getFullYear()} Your E-Commerce Store. All rights
            reserved.
         </p>
      </footer>
   );
};

export default Footer;
