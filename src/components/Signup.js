import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Signup() {

    const [fullname, setFullname] = useState('');
    const [emailormobile, setEmailorMobile] = useState('');
    const [password, setPassword] = useState('');
    // const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = e => {
        e.preventDefault();
        console.log(e)
    }

    const handleClick = () => {
        navigate("/login")
     }

     useEffect(() => {
        document.title = 'OYT | Signup';
      }, []);

    return(
        <div className="auth-form-container">
              <h1>Signup</h1>
            <form onSubmit={handleSubmit} className="register-form">
                <label htmlFor="fullName">Full Name</label>
                <input id="fullName" value={fullname} onChange={ e => {
                    setFullname(e.target.value)
                }} placeholder="Full Name"></input>
                <label htmlFor="emailormobile">Email or Mobile</label>
                <input id="emailormobile" value={emailormobile} onChange={e => {
                    setEmailorMobile(e.target.value)
                }} placeholder="Email Or Mobile"></input>
                <label htmlFor="password">Password</label>
                <input id="password" value={password} onChange={e => {
                    setPassword(e.target.value)
                }} type="password" placeholder="Password"></input>
                {/* <label htmlFor="confirmPassword">Confirm Password</label>
                <input id="confirmPassword" type="password" placeholder="Confirm Password"></input> */}
                <button type="submit" onClick={handleClick}>SignUp</button>
            </form>
            <button className="link-btn" onClick={handleClick}>Already have an account? login here</button>
        </div>
    )
}
