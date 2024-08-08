// import logo from './logo.svg';
import "./App.css";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./components/Login";
import Signup from "./components/Signup";
import HomePage from "./components/HomePage";
// import BgLogo from './utlities/bg'
import Posts from "./components/Posts";
import Students from "./components/Students";
// import Counternum from './components/Counternum';
export default function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="/students" element={<Students />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
