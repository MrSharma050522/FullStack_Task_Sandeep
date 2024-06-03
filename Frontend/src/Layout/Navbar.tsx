import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { saveToken, setName } from "../Store/slice";
import { RootState } from "../Store/store"; // Import RootState from the store file
import "./Navbar.css";

export default function Navbar() {
  const userName = useSelector((state: RootState) => state.auth.username);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutUser = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    dispatch(saveToken(""));
    dispatch(setName(""));
    navigate("/login");
  };

  return (
    <nav className="navstyle">
      <h1 className="h1">Hello! {userName || "Guest"} </h1>
      <h2>Your Daily Planner</h2>
      <ul className="nav">
        {!userName && (
          <li className="nav-item">
            <NavLink
              className="navLink"
              to="/login"
            >
              <button className="button">Login</button>
            </NavLink>
          </li>
        )}
        {!userName && (
          <li className="nav-item">
            <NavLink
              className="navLink"
              to="/register"
            >
              <button className="button">Register</button>
            </NavLink>
          </li>
        )}
        {userName && (
          <li>
            <NavLink
              className="navLink"
              to="/mytask"
            >
              <button className="button">All Task</button>
            </NavLink>
          </li>
        )}
        {userName && (
          <li className="nav-item">
            <a
              href="/"
              className="navLink"
              onClick={logoutUser}
            >
              <button className="button">Logout</button>
            </a>
          </li>
        )}
      </ul>
    </nav>
  );
}
