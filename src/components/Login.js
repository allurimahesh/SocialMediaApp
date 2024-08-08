import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "./loader";
// import {TextField} from '@mui/material'

export default function Login() {
  const [emailorMobile, setEmailorMobile] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate("/posts");
    }, 3000);
  };

  useEffect(() => {
    document.title = "OYT | Login";
  }, []);

  const handleClick = () => {
    navigate("/signup");
  };

  const handleClickHome = () => {
    navigate("/");
  };

  return (
    <div className="bg-image">
      <div className="auth-form-container" style={{ backgroundColor: "blue" }}>
        <h1>Login</h1>
        <form onSubmit={handleSubmit} className="login-form">
          {/* <TextField id="emailormobile" label="Email or Mobile" variant="standard" value={emailorMobile}  onChange={ e => setEmailorMobile(e.target.value)} placeholder="Email Or Mobile"/> 
                    <TextField id="password" label="Password" variant="standard"  onChange={ e => setPassword(e.target.value)} placeholder="Email Or Mobile"/>  */}
          <label>Email or Mobile</label>
          <input
            value={emailorMobile}
            onChange={(e) => setEmailorMobile(e.target.value)}
            id="emailormobile"
            placeholder="Email or Mobile"
          ></input>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id="password"
            placeholder="Password"
          ></input>
          {loading ? <Loader /> : <button type="submit">Login</button>}
        </form>
        <button className="link-btn" onClick={handleClick}>
          Don't have an account? Register here
        </button>
        <button className="link-btn" onClick={handleClickHome}>
          Home
        </button>
      </div>
    </div>
  );
}
