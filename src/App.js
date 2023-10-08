import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home";
import Legal from "./Pages/Legal";
import NotFound from "./Pages/NotFound";
import Appointment from "./Pages/Appointment";
import Login from "./Components/Login/Login";
import Signup from "./Components/Signup/Signup";
import VerifyHealthId from './components/verifyHealthId/verifyHealthId';
import './ndhm.scss';
import PatientQueue from './components/patient-queue/patientQueue';
import VerifyAadhaar from "./components/creation/verifyAadhaar";
import {fetchGlobalProperty} from './api/hipServiceApi';
import {cmSuffixProperty} from '../src/api/constants';

function App() {
  const user = localStorage.getItem("users");
  const params = Object.fromEntries(
    new URLSearchParams(window.location.search)
  );

  useEffect(async ()=>{
      const response = await fetchGlobalProperty(cmSuffixProperty)
      if(response.Error === undefined ){
         localStorage.setItem(cmSuffixProperty, response)
      }
  },[])

  switch (params['action']) {
    case "patientQueue":
      return (
          <PatientQueue />
      );
    case "createABHA":
      return (
          <VerifyAadhaar />
      );
    default:
      return (
          <VerifyHealthId />
      );
  }
  return (
    <div className="App">
      <Router basename="/Health-Plus">
        <Routes>
          {user &&<Route path="/" element={<Home />} />}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/legal" element={<Legal />} />
          <Route path="/appointment" element={<Appointment />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
