import React from "react";
import { Routes, Route } from 'react-router-dom';
import Articles from "../pages/Articles";
import HomePage from "../pages/HomePage";
import Login from "../pages/Login";
import Messages from "../pages/Messages";
import NewArticle from "../pages/NewArticle";
import NewMessage from "../pages/NewMessage";
import Signup from "../pages/Signup";
import Profil from "../pages/Profil";
import NotFound from "../pages/NotFound";
import DeleteAccount from "../pages/DeleteAccount";

function App() {
  return (
    <Routes>
      <Route path="/" element={< HomePage />} />
      <Route path="signup" element={<Signup />} />
      <Route path="login" element={<Login />} />
      <Route path="messages" element={<Messages />} />
      <Route path="newmessage" element={<NewMessage />} />
      <Route path="articles" element={<Articles />} />
      <Route path="newarticle" element={<NewArticle />} />
      <Route path="profil" element={<Profil />} />
      <Route path="delete" element={<DeleteAccount />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
