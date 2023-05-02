import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { auth } from "../../firebase";
import { useContext } from "react";
import { CartContext } from "../../components/cart/CartContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import logo from "../../assets/logo/CP-Vendors-Transparent-Logo.png";
import "../../styles/Navbar.css";

const Navbar = () => {
   const [user, setUser] = useState(null);
   const [dropdownOpen, setDropdownOpen] = useState(false);
   const { cart } = useContext(CartContext);

   useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged((user) => {
         setUser(user);
      });

      return () => {
         unsubscribe();
      };
   }, []);

   const toggleDropdown = () => {
      setDropdownOpen(!dropdownOpen);
   };

   return (
      <nav>
         <div>
            <Link to="/" className="brand-name">
               <div className="logo-container">
                  <img src={logo} alt="CP Vendors" className="logo" />
               </div>
            </Link>
         </div>
         <div>
            <Link to="/cart">
               <FontAwesomeIcon icon={faShoppingCart} />
               <span>{cart.length}</span>
            </Link>
         </div>
         <div className="navbar-links">
            <Link to="/products">Products</Link>
            {user ? (
               <>
                  <Link to="/logout">Logout</Link>
               </>
            ) : (
               <>
                  <Link to="/login">Login</Link>
                  <Link to="/signup">Sign up</Link>
               </>
            )}
         </div>
         <div className="hamburger" onClick={toggleDropdown}>
            ☰
         </div>
         <div className={`dropdown-menu ${dropdownOpen ? "open" : ""}`}>
            <div className="dropdown-menu-content">
               <Link to="/products" onClick={toggleDropdown}>
                  Products
               </Link>
               {user ? (
                  <>
                     <Link to="/logout" onClick={toggleDropdown}>
                        Logout
                     </Link>
                  </>
               ) : (
                  <>
                     <Link to="/login" onClick={toggleDropdown}>
                        Login
                     </Link>
                     <Link to="/signup" onClick={toggleDropdown}>
                        Sign up
                     </Link>
                  </>
               )}
            </div>
         </div>
      </nav>
   );
};

export default Navbar;
