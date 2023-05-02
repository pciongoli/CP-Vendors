import React from "react";
import { auth } from "../../firebase";
import "../../styles/Logout.css";
import { useNavigate } from "react-router-dom";

const Logout = () => {
   const navigate = useNavigate();

   const signOut = async () => {
      try {
         await auth.signOut();
         navigate("/login");
      } catch (error) {
         alert(error.message);
      }
   };

   return (
      <div className="main-content">
         <div className="logout">
            <h1>Logout</h1>
            <button onClick={signOut}>Logout</button>
         </div>
      </div>
   );
};

export default Logout;
