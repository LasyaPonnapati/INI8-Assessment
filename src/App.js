import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./components/SignUp";
import Home from "./components/HomePage"; 
import UpdateProfile from "./components/UpdateProfile";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/home" element={<Home />} />
        <Route path="/update" element={<UpdateProfile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
