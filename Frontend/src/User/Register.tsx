import React, { useRef, useState } from "react";
import { Spinner } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { backendURL } from "../App";
import { saveToken, setEmail, setName } from "../Store/slice";
import "./Form.css";

const Register: React.FC = () => {
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const registerHandler = (event: React.FormEvent) => {
    event.preventDefault();
    const name = nameRef.current!.value;
    const email = emailRef.current!.value;
    const password = passwordRef.current!.value;
    setLoading(true);
    fetch(`${backendURL}/user/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    })
      .then((res) => res.json())
      .then((data) => {
        dispatch(saveToken(data.token));
        dispatch(setName(data.user.name));
        dispatch(setEmail(data.user.email));
        navigate("/mytask");
      })
      .catch((err) => alert(err.message))
      .finally(() => setLoading(false));
  };

  return (
    <div className="div">
      {loading && <Spinner variant="light" />}
      <form onSubmit={registerHandler}>
        <h1>Register</h1>
        <label htmlFor="name">Enter User Name</label>
        <br />
        <input type="text" ref={nameRef} required /> <br />
        <label htmlFor="email">Enter User Email</label> <br />
        <input type="email" ref={emailRef} required /> <br />
        <label htmlFor="password">Enter User Password</label> <br />
        <input type="password" ref={passwordRef} required />
        <br />
        <button className="button" type="submit">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
