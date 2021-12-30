import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from "./HomePage";
import Login from "./Login";
import Signup from "./Signup";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={< HomePage />} />
        <Route path="signup" element={<Signup />} />
        <Route path="login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
