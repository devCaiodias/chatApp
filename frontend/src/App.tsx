import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./container/Navbar";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";

import { useAuthStore } from "./store/useAuthStore";
import { useEffect } from "react";
import { LoaderCircle } from "lucide-react";

import style from './style/App.module.css'
import { Toaster } from "react-hot-toast";

export default function App() {
    const {authUser, checkAuth, isCheckingAuth} = useAuthStore() as any

    useEffect(() => {
      checkAuth()
    }, [checkAuth])

    console.log({authUser})

    if (isCheckingAuth && !authUser) return ( 
      <div className={style.div_louad}>
        <LoaderCircle size={40} className={style.load} />
      </div>
    )

    return (
      <>
        <Navbar />

        <Routes>
          <Route path="/" element={authUser ? <Home/> : <Navigate to="/login" />} />
          <Route path="/signup" element={!authUser ? <Signup /> : <Navigate to="/" />} />
          <Route path="/login" element={!authUser ? <Login /> :  <Navigate to="/" />} />
          <Route path="/profile" element={authUser ? <Profile /> : <Navigate to="/" />} />
        </Routes>

        <Toaster />
      </>
    )
  }
