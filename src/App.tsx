import React, { useEffect } from "react";

import "./App.css";
import Home from "./screens/Home";
import SignIn from "./screens/SignIn";
import Dashboard from "./screens/Dashboard";
import { useDispatch } from "react-redux";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./Navbar";
import { StoreData } from "./store/model";
import { authActions } from "./store/auth";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const storedData = localStorage.getItem("formData");

    if (storedData) {
      dispatch(authActions.login(JSON.parse(storedData)));
    }
  }, []);
  return (
    <Router>
      <div style={{ margin: "20px" }}>
        <Navbar />
      </div>

      <div className="App"></div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/sign-in" element={<SignIn />} />
      </Routes>
    </Router>
  );
}

export default App;
