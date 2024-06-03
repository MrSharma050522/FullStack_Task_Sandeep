import React, { useRef, useState } from "react";
import { Spinner } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { backendURL } from "../App";
import { saveToken, setEmail, setName } from "../Store/slice";
import "./Form.css";

const LogIn: React.FC = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logInHandler = (event: React.FormEvent) => {
    event.preventDefault();
    const email = emailRef.current!.value;
    const password = passwordRef.current!.value;
    setLoading(true);
    fetch(`${backendURL}/user/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then((res) => res.json())
      .then((data) => {
        dispatch(saveToken(data.token));
        dispatch(setName(data.user.name));
        dispatch(setEmail(data.user.email));
        navigate("/mytask");
      })
      .catch(() => alert("This email is not registered!"))
      .finally(() => setLoading(false));
  };

  return (
    <div className="div">
      {loading && <Spinner variant="light" />}
      <form onSubmit={logInHandler}>
        <h1>Login</h1>
        <label htmlFor="email">Enter User Email</label>
        <input type="email" ref={emailRef} required />
        <label htmlFor="password">Enter User Password</label>
        <input type="password" ref={passwordRef} required />
        <br />
        <button className="button" type="submit">
          Login
        </button>
      </form>
    </div>
  );
};

export default LogIn;
