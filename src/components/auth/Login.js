import React, { useState } from "react";
import { Link } from "react-router-dom";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";
import "../../styles/Login.css";

const Login = () => {
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [error, setError] = useState("");

   const navigate = useNavigate();

   const handleSubmit = async (e) => {
      e.preventDefault();
      try {
         await auth.signInWithEmailAndPassword(email, password);
         navigate("/");
      } catch (error) {
         setError(error.message);
      }
   };

   return (
      <div className="main-content">
         <div className="login">
            <form onSubmit={handleSubmit}>
               <h2>Login</h2>
               {error && <p className="error">{error}</p>}
               <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
               />
               <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
               />
               <button type="submit">Login</button>
               <p>
                  Don't have an account? <Link to="/signup">Sign Up</Link>
               </p>
            </form>
         </div>
      </div>
   );
};

export default Login;
