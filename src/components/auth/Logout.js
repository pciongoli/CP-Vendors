import React from "react";
import { auth } from "../../firebase";

const Logout = () => {
   const signOut = async () => {
      try {
         await auth.signOut();
      } catch (error) {
         alert(error.message);
      }
   };

   return (
      <div>
         <h1>Logout</h1>
         <button onClick={signOut}>Logout</button>
      </div>
   );
};

export default Logout;
