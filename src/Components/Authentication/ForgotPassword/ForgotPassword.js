import React, { useState, useEffect } from "react";

import { Form, Button } from "semantic-ui-react";

import "./ForgotPassword.css";
import "../Signup/SignUp.css";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";

toast.configure();

const ForgotPassword = () => {
  const history = useHistory();

  //------------------------------State Variables------------------------------------
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [users, setUsers] = useState([]);

  //-------------------------------Side Effects------------------------------------------
  useEffect(() => {
    const users = JSON.parse(localStorage.getItem("users"));
    setUsers(users);
  }, []);

  //-----------------------------------Handlers-------------------------------------------

  /**
   *
   * @param {React.SyntheticEvent} e
   * @param {import("semantic-ui-react").InputProps} ed
   * @param {string} type
   */
  const onChangeHandler = (e, ed, type) => {
    switch (type) {
      case "email":
        return setEmail(ed.value);
      case "password":
        return setPassword(ed.value);
      case "confirmPassword":
        return setConfirmPassword(ed.value);
    }
  };

  /**
   * @description Function to change password for a user by performing validations and storing it in localstorage
   */
  const onSubmitHandler = () => {
    const duplicatedUsers = JSON.parse(JSON.stringify(users));
    const index = duplicatedUsers.findIndex((user) => user.email === email);
    if (index === -1)
      return toast.error("User Does Not Exist", {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    if (password !== confirmPassword)
      return toast.error("Password Does Not Match", {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    duplicatedUsers[index].password = password;
    setUsers(duplicatedUsers);
    localStorage.setItem("users", JSON.stringify(duplicatedUsers));
    history.push("/");
  };

  //---------------------------------------JSX------------------------------------------
  return (
    <div className="sign-up-form-wrapper">
      <h1>Forgot Password</h1>
      <div className="sign-up-form">
        <Form onSubmit={onSubmitHandler} className="form-data">
          <Form.Input
            onChange={(e, ed) => onChangeHandler(e, ed, "email")}
            label="Email"
            type="email"
            required
            value={email}
          />
          <Form.Input
            onChange={(e, ed) => onChangeHandler(e, ed, "password")}
            label="Password"
            required
            type="password"
            value={password}
          />
          <Form.Input
            onChange={(e, ed) => onChangeHandler(e, ed, "confirmPassword")}
            label="Confirm Password"
            type="password"
            required
            value={confirmPassword}
          />
          <Button style={{ width: "100%" }} primary>
            Submit
          </Button>
        </Form>
        <p>--------------------------or------------------------</p>
        <Button
          primary
          style={{ width: "100%" }}
          onClick={() => history.push("/")}
        >
          Log In
        </Button>
      </div>
    </div>
  );
};

export default ForgotPassword;
