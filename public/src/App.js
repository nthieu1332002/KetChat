import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Register from "./pages/Register/Register"
import Login from "./pages/Login/Login"
import SetAvatar from "./pages/SetAvatar/SetAvatar"
import Chat from "./pages/Chat/Chat"
import WelcomePage from "./pages/WelcomePage/WelcomePage"
import { ToastContainer } from "react-toastify";
import PrivateRoutes from "./config/PrivateRoutes"
import "react-toastify/dist/ReactToastify.css";
import Cookies from 'js-cookie'
import ProtectedRoutes from './config/ProtectedRoutes'

const App = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<ProtectedRoutes/>}>
          <Route path="/" element={<WelcomePage />} exact></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/setAvatar" element={<SetAvatar />}></Route>
        </Route>

        <Route element={<PrivateRoutes />}>
          <Route path="/chat" element={<Chat />}></Route>
        </Route>
      </Routes>
      <ToastContainer autoClose={2000} />
    </BrowserRouter>
  )
}

export default App
