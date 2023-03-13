import logo from "./logo.svg";
import "./App.css";
import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import "bootstrap/dist/css/bootstrap.min.css";
import Activate from "./components/Activate";
import ForgotPassword from './components/ForgotPassword'
import ResetPassword from "./components/ResetPassword";
import PersonalInfo from "./components/PersonalInfo";
function App() {
  const [email,setEmail] = useState("");


  const emailSetter = (e) =>{
    setEmail(e);
  }

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />}/>
          <Route path='register/' element={<Register />}/>
          <Route path='home/' element={<Home />}/>
          <Route exact path='activate/:id/:token/' element={<Activate />}/>
          <Route  path='forgot/' element={<ForgotPassword emailSetter={emailSetter}/>}/>
          <Route path='password/reset/confirm/:id/:token/' element={<ResetPassword resetEmailPassword={email}/>}/>
          <Route path='personal-info/' element={<PersonalInfo/>}/>

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
