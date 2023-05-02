import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";
import "../../styles/Signup.css";

function SignUp() {
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [confirmPassword, setConfirmPassword] = useState("");
   const [error, setError] = useState("");

   const navigate = useNavigate();

   const handleSubmit = async (e) => {
      e.preventDefault();
      if (password !== confirmPassword) {
         setError("Passwords do not match");
         return;
      }
      try {
         await createUserWithEmailAndPassword(auth, email, password);
         alert("Account created successfully");
         navigate("/");
      } catch (error) {
         setError(error.message);
      }
   };

   return (
      <div className="main-content">
         <div className="signup">
            <h1>Signup Page</h1>
            <form onSubmit={handleSubmit}>
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
               <input
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
               />
               {error && <p className="error">{error}</p>}
               <button type="submit">Signup</button>
            </form>
         </div>
      </div>
   );
}

export default SignUp;
