import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { saveToken, setName } from "../Store/slice";
import classes from "./Navbar.module.css";

export default function Navbar() {
  const userName = useSelector((state) => state.username);
  console.log("User Name - ", userName);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutUser = (event) => {
    event.preventDefault();
    dispatch(saveToken(""));
    dispatch(setName(""));
    navigate("/login");
  };

  return (
    <nav className={`navbar ${classes.navstyle}`}>
      <h1 className={classes.h1}>Hello! {userName || "Guest"} </h1>
      <h2>Your Daily Planner</h2>
      <ul className="nav">
        {!userName && (
          <li className="nav-item">
            <NavLink
              className={`nav-link ${classes.navLink}`}
              to="/login"
            >
              <button className={classes.button}>Login</button>
            </NavLink>
          </li>
        )}
        {!userName && (
          <li className="nav-item">
            <NavLink
              className={`nav-link ${classes.navLink}`}
              to="/register"
            >
              <button className={classes.button}>Register</button>
            </NavLink>
          </li>
        )}
        {userName && (
          <li>
            <NavLink
              className={`nav-link ${classes.navLink}`}
              to="/mytask"
            >
              <button className={classes.button}>All Task</button>
            </NavLink>
          </li>
        )}
        {userName && (
          <li className="nav-item">
            <a
              href="/"
              className={`nav-link ${classes.navLink}`}
              onClick={logoutUser}
            >
              <button className={classes.button}>Logout</button>
            </a>
          </li>
        )}
      </ul>
    </nav>
  );
}
