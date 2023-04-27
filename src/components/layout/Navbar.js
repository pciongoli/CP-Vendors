import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { auth } from "../../firebase";
import "../../styles/Navbar.css";

const Navbar = () => {
   const [user, setUser] = useState(null);
   const [isNavCollapsed, setIsNavCollapsed] = useState(true);

   useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged((user) => {
         setUser(user);
      });

      return () => {
         unsubscribe();
      };
   }, []);

   const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);

   return (
      <nav className="navbar">
         <Link className="navbar-logo" to="/">
            Home
         </Link>
         <button className="navbar-toggler" onClick={handleNavCollapse}>
            <span className="navbar-toggler-icon">&#9776;</span>
         </button>
         <div
            className={`navbar-links${
               isNavCollapsed ? " navbar-collapse" : ""
            }`}
         >
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
      </nav>
   );
};

export default Navbar;
