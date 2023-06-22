import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import "bootstrap/dist/js/bootstrap.min.js";
import AuthService from "./services/auth.service";
import swal from "sweetalert";
import Login from "./components/Login";
import Register from "./components/Register";

import Profile from "./components/Profile";
import SubmitPaper from "./components/SubmitPaper";
import { Admin } from "./components/Admin";
// import AuthVerify from "./common/AuthVerify";
import EventBus from "./common/EventBus";
import Topics from "./components/Topics";

import { PaperStatus } from "./components/PaperStatus";
import TopicHome from "./components/TopicHome";
import { PaperHome } from "./components/PaperHome";
import ShowTutorial from "./components/ShowTutorial";
// import SweetAlert from "react-bootstrap-sweetalert/dist/components/SweetAlert";
const App = () => {
  const [showModeratorBoard, setShowModeratorBoard] = useState(false);
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);
  const isLogin = true;
  const roles = ["ROLE_AUTHOR", "ROLE_ADMIN"];
  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      console.log(user);
      setCurrentUser(user);
      setShowModeratorBoard(user.userRole.includes("ROLE_MODERATOR"));
      setShowAdminBoard(user.userRole.includes("ROLE_ADMIN"));
    }

    EventBus.on("logout", () => {
      logOut();
    });

    return () => {
      EventBus.remove("logout");
    };
  }, []);

  const logOut = () => {
    f1();
    f2();
  };

  const f1 = () => {
    setTimeout(() => {
      swal("Logged Out!", "You have successfully logged out!", "success");
    }, 400);
  };

  const f2 = () => {
    AuthService.logout();
    setShowModeratorBoard(false);
    setShowAdminBoard(false);
    setCurrentUser(undefined);
  };

  return (
    <div>
      <nav className="navbar navbar-expand ">
        {/* <Link to={"/"} className="navbar-brand">
          Nanofim
        </Link> */}
        <span className="logo">Nanofim</span>

        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/"} className="nav-link">
                Home
              </Link>
            </li>
            {currentUser &&
              currentUser.userRole === "ROLE_AUTHOR" && ( //roles.includes(currentUser.userRole)
                <li className="nav-item">
                  <Link to={"/submitpaper"} className="nav-link">
                    Submit Paper
                  </Link>
                </li>
              )}
            {currentUser && currentUser.userRole === "ROLE_ADMIN" && (
              <li className="nav-item">
                <Link to={"/admin"} className="nav-link">
                  Admin
                </Link>
              </li>
            )}
          </div>

          {currentUser ? (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/profile"} className="nav-link">
                  {/* {currentUser.username} */}
                  Profile
                </Link>
              </li>

              <li className="nav-item">
                <Link to="/login" className="nav-link" onClick={logOut}>
                  Logout
                </Link>
              </li>
            </div>
          ) : (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/login"} className="nav-link">
                  Login
                </Link>
              </li>

              <li className="nav-item">
                <Link to={"/register"} className="nav-link">
                  Sign Up
                </Link>
              </li>
            </div>
          )}
        </div>
      </nav>

      <Routes>
        <Route exact path={"/"} element={<TopicHome />} />
        {/* <Route exact path="/topics/:topic/:id" element={<ProtectedRoute/>}>
          <Route exact path="/topics/:topic/:id" element={<Topics/>}/></Route> */}
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/profile" element={<Profile />} />
        <Route exact path="/topic" element={<Topics></Topics>} />
        <Route
          exact
          path="/submitpaper"
          element={<SubmitPaper></SubmitPaper>}
        />
        <Route
          exact
          path="/paperStatus"
          element={<PaperStatus></PaperStatus>}
        />
        <Route path="/admin/:tab" element={<Admin></Admin>} />
        <Route path="/admin" element={<Admin></Admin>} />
        {/* <Route path="/home"  element={<TopicHome></TopicHome>}>
          <Route path="/home/paperHome" element={<PaperHome></PaperHome>} />
        </Route> */}
        <Route path="/home/paperHome" element={<PaperHome></PaperHome>}/>  
        {/* <Route exact path="/showTutorial" element={<ShowTutorial/>}></Route> */}
      </Routes>

      {/* <AuthVerify logOut={logOut}/> */}
    </div>
  );
};

export default App;
