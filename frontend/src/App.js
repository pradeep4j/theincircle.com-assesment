import React, { useEffect } from "react";
import Navbar from "./components/navbar/Navbar";
//auth user
import Signup from "./components/auth/Signup";
import Login from "./components/auth/Login";
import Profile from "./components/auth/Profile";
import Logout from "./components/auth/Logout";
//students created by auth user
import Editstudent from "./components/student/Editstudent";
import Createstudent from "./components/student/Createstudent";
import Student from "./components/student/Student";

import Home from "./components/Home";
import Welcome from "./components/Welcome";
import PrivateRoute from './routes/PrivateRoutes';
import PublicRoute from './routes/PublicRoutes';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Welcome />} />
        <Route path="/create-student" element={<PrivateRoute><Createstudent /></PrivateRoute>} />
        <Route path="/edit-student/:id" element={<PrivateRoute><Editstudent /></PrivateRoute>} />
        <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>} />
        <Route path="/student" element={<PrivateRoute><Student /></PrivateRoute>} />
        <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
        <Route path="/logout" element={<PrivateRoute><Logout /></PrivateRoute>} />
        <Route path="/sign-up" element={<PublicRoute><Signup /></PublicRoute>} />
        <Route path="/user-profile/:id" element={<PrivateRoute><Profile /></PrivateRoute>} />
      </Routes>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </Router>
  );
}

export default App;
