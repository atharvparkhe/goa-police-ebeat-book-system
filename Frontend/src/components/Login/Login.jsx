import React, { useState, useEffect } from "react";
import "./Login.css";
import { Typography, Button, Backdrop, CircularProgress } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser} from "../../actions/auth";
import { useAlert } from "react-alert";
import logo from "../../assets/goa_police.png";

const Login = () => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { message, loading, error, isAuthenticated } = useSelector(
    (state) => state.user
  );
  const navigate = useNavigate();


  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch({ type: "clearError" });
    }
    if (message) {
      alert.success(message);
      dispatch({ type: " clearMessage" });
    }
    if (isAuthenticated === true) {
      navigate("/");
    }
  }, [dispatch, error, alert, message]);

  const loginHandler = (e) =>{
    const data = new FormData(e.target)
    const email = data.get("email")
    const password = data.get("password")
    dispatch(loginUser(email,password))
  }

  if (loading)
    return (
      <Backdrop open={true}>
        <CircularProgress />
      </Backdrop>
    );
  else
    return (
      <div className="login">
        <form className="loginForm" onSubmit={loginHandler}>
          <Typography
            variant="h3"
            style={{ padding: "2vmax", textAlign: "center" }}
          >
            Goa Police
          </Typography>
          <input
            type="email"
            placeholder="Email"
            required
            name="email"
          />
          <input
            type="password"
            placeholder="Password"
            required
            name="password"
          />
          <Button type="submit">Login</Button>
          <img src={logo} alt="Goa Police Logo"/>
        </form>
      </div>
    );
};

export default Login;
