import React, { useState, useEffect } from "react";
import axios from "axios"; 
import "../../Auth.css";

const LoginSignup = () => {
  const [isSignup, setIsSignup] = useState(false); 
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");  

  
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn === "true") {
      window.location.href = "/"; 
    }
  }, []);

 
  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

 
  const handleSubmit = async () => {
    if (!form.username || !form.password) {
      setError("Both fields are required.");
      return; 
    }

    try {
      if (isSignup) {
       
        const response = await axios.post("http://localhost:5000/users", form);
        alert(response.data ? "Signup successful! Please log in." : "Error during signup.");
        setIsSignup(false); 
      } else {
        const response = await axios.get("http://localhost:5000/users");
        const user = response.data.find(
          (user) => user.username === form.username && user.password === form.password
        );

        if (user) {
          alert("Login successful!");
          localStorage.setItem("isLoggedIn", "true"); 
          window.location.href = "/"; 
        } else {
          setError("Invalid credentials! Please try again.");
        }
      }
    } catch (error) {
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="auth-container">
      <h1>{isSignup ? "Sign Up" : "Log In"}</h1>
      {error && <p className="error">{error}</p>} 
      
      <input
        type="text"
        name="username"
        placeholder="Username"
        value={form.username}
        onChange={handleInputChange}
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={form.password}
        onChange={handleInputChange}
        required
      />
      <button onClick={handleSubmit}>
        {isSignup ? "Sign Up" : "Log In"}
      </button>
      <p onClick={() => setIsSignup(!isSignup)}>
        {isSignup ? "Already have an account? Log in." : "Don't have an account? Sign up."}
      </p>
    </div>
  );
};

export default LoginSignup;
