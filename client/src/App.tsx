import axios from "axios";
import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import About from "./components/About/About";

import CreateForm from "./components/CreateForm/CreateForm";
import Home from "./components/Home/Home";
import LandingPage from "./components/LandingPage/LandingPage";
import NavBar from "./components/NavBar/NavBar";


axios.defaults.baseURL = "https://pidogstype-production.up.railway.app/"

function App() {
  return (
    <div className="App">
      <React.Fragment>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<NavBar />}>
            <Route index element={<Home />} />
            <Route path="create" element={<CreateForm />} />
            <Route path="about" element={<About />} />
          </Route>
        </Routes>
      </React.Fragment>
    </div>
  );
}

export default App;
