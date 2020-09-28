import React, { useState, useEffect } from "react";

import logo from "../../../assets/exchange_rate.jpg";

import "./Login.css";
import { Form, Button, Message } from "semantic-ui-react";
import { toast } from "react-toastify";
import { useHistory, NavLink } from "react-router-dom";

import GoogleLogin from "react-google-login";

toast.configure();
const Login = () => {
  const history = useHistory();

  //-------------------------State Variables---------------------------
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //-------------------------Handlers----------------------------------
  /**
   * @description Login Submit Handler, which perfoems validations and then logs in
   */
  const onSubmitHandler = () => {
    const users = JSON.parse(localStorage.getItem("users"));
    if (!users) {
      return toast.error("User does not exist", {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    } else {
      const emailIndex = users.findIndex((user) => user.email === email);
      if (emailIndex === -1) {
        return toast.error("User does not exist", {
          position: toast.POSITION.BOTTOM_CENTER,
        });
      } else {
        const userPassword = users.find((user) => user.email === email);

        if (userPassword.password !== password) {
          return toast.error("Password Does Not Match", {
            position: toast.POSITION.BOTTOM_CENTER,
          });
        } else {
          const userName = users.find((user) => user.email === email);
          localStorage.setItem("user", JSON.stringify(userName.firstName));
          history.replace("/home-page");
        }
      }
    }
  };

  /**
   *
   * @param {React.SyntheticEvent} e
   * @param {InputProps from semantic-ui} ed
   * @param {string} type
   * @description Input Change Handler
   */
  const onChangeHandler = (e, ed, type) => {
    switch (type) {
      case "userName":
        return setEmail(ed.value);
      case "pwd":
        return setPassword(ed.value);
    }
  };

  /**
   *
   * @param {OAuth Response} response
   * @description Login in handler for OAuth
   */
  const responseGoogle = (response) => {
    if (response.profileObj) {
      localStorage.setItem(
        "user",
        JSON.stringify(response.profileObj.givenName)
      );
      history.replace("/home-page");
    }
  };

  //-----------------------------JSX---------------------------------------
  return (
    <div className="login-wrapper">
      <div className="forex-logo">
        <img src={logo} alt="Logo" />
      </div>
      <div className="form-wrapper">
        <Form onSubmit={onSubmitHandler}>
          <Form.Input
            onChange={(e, ed) => onChangeHandler(e, ed, "userName")}
            value={email}
            label="Email"
            name="userName"
            required
          />
          <Form.Input
            label="Password"
            type="password"
            name="userName"
            required
            value={password}
            onChange={(e, ed) => onChangeHandler(e, ed, "pwd")}
          />
          <Button style={{ width: "100%" }} primary>
            Login
          </Button>
        </Form>
        <GoogleLogin
          clientId="618836972321-gif0s87vf8thcsq2jjuimusj7lmgfs9s.apps.googleusercontent.com"
          buttonText="Login"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy={"single_host_origin"}
          className="google-login-button"
        />
      </div>
      <Message className="message-box">
        <NavLink to="/sign-up">Don't Have an Account</NavLink>
        <NavLink to="/forgot-password">Forgot Password</NavLink>
      </Message>
    </div>
  );
};

export default Login;
