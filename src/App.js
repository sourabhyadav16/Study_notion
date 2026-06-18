import "./App.css";
import React from "react";
import Home from "../src/pages/Home";
import {Routes,Route} from "react-router-dom";
import Navbar from "./components/common/Navbar";
import Login from "./pages/Login";
import SignUp from "./pages/Signup";
import { useState } from "react";
function App() {
  const [isLoggedIn,setIsLoggedIn] = useState(false);
  return (
    <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn}></Login>}></Route>
        <Route path="/signup" element={<SignUp setIsLoggedIn={setIsLoggedIn}></SignUp>}></Route>
      </Routes>
    </div>
  );
}
export default App;
