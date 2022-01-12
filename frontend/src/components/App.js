import React from "react";
import { Routes, Route } from 'react-router-dom';
import HomePage from "./HomePage";
import Login from "./Login";
import Messages from "./Messages";
import NewMessage from "./NewMessage";
import Signup from "./Signup";

function App() {
  return (
    <Routes>
      <Route path="/" element={< HomePage />} />
      <Route path="signup" element={<Signup />} />
      <Route path="login" element={<Login />} />
      <Route path="messages" element={<Messages />} />
      <Route path="newmessage" element={<NewMessage />} />
    </Routes>
  );
}

export default App;
