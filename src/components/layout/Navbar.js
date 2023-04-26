import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { auth } from "../../firebase";

const Navbar = () => {
   const [user, setUser] = useState(null);

   useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged((user) => {
         setUser(user);
      });

      return () => {
         unsubscribe();
      };
   }, []);

   return (
      <nav>
         <div>
            <Link to="/">Home</Link>
         </div>
         <div>
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
