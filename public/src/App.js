import React, { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Register from "./pages/Register/Register"
import Login from "./pages/Login/Login"
import SetAvatar from "./pages/SetAvatar/SetAvatar"
import Chat from "./pages/Chat/Chat"
import WelcomePage from "./pages/WelcomePage/WelcomePage"
import { ToastContainer } from "react-toastify";
import PrivateRoutes from "./config/PrivateRoutes"
import "react-toastify/dist/ReactToastify.css";
import { useCookies } from "react-cookie";


const App = () => {
  const [cookies, setCookie, removeCookie] = useCookies(['user']);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<WelcomePage />} exact></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/setAvatar" element={<SetAvatar />}></Route>
        <Route
          element={<PrivateRoutes redirectLink="/login" />} >
          <Route path="/chat" element={<Chat />}></Route>
        </Route>
      </Routes>
      <ToastContainer autoClose={2000} />
    </BrowserRouter>
  )
}

export default App
