import React, { useEffect, useState } from "react";
import { Form, Button } from "semantic-ui-react";

import "./SignUp.css";

import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";

toast.configure();

const SignUp = () => {
  const history = useHistory();

  //---------------------------------State Variables-----------------------------------
  const [users, setUsers] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  //--------------------------------------Side Effects----------------------------------
  useEffect(() => {
    const users = localStorage.getItem("users");
    if (users) setUsers(JSON.parse(users));
    else setUsers([]);
  }, []);

  //---------------------------------------Handlers-------------------------------------
  /**
   * @description Function to create a user by performing validations and storing in LocalStorage
   */
  const onSubmitHandler = () => {
    if (password !== confirmPassword)
      return toast.error("Password Does Not Match", {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    const index = users.findIndex((user) => user.email === email);
    if (index !== -1) {
      return toast.error("Email already taken", {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    } else {
      const user = {
        firstName,
        lastName,
        email,
        password,
      };
      const updatedUsers = JSON.parse(JSON.stringify(users));
      updatedUsers.push(user);
      setUsers(updatedUsers);
      localStorage.setItem("users", JSON.stringify(updatedUsers));
      history.push("/");
    }
  };

  /**
   *
   * @param {React.SyntheticEvent} e
   * @param {import("semantic-ui-react").InputProps} ed
   * @param {string} type
   * @description Input Change Handler
   */
  const onChangeHandler = (e, ed, type) => {
    switch (type) {
      case "first":
        return setFirstName(ed.value);
      case "last":
        return setLastName(ed.value);
      case "email":
        return setEmail(ed.value);
      case "pwd":
        return setPassword(ed.value);
      case "confirm_pwd":
        return setConfirmPassword(ed.value);
    }
  };

  //--------------------------------------------JSX----------------------------------------------
  return (
    <div className="sign-up-form-wrapper">
      <h1>Sign Up</h1>
      <div className="sign-up-form">
        <Form onSubmit={onSubmitHandler} className="form-data">
          <Form.Input
            onChange={(e, ed) => onChangeHandler(e, ed, "first")}
            label="First Name"
            required
            value={firstName}
          />
          <Form.Input
            onChange={(e, ed) => onChangeHandler(e, ed, "last")}
            label="Last Name"
            required
            value={lastName}
          />
          <Form.Input
            onChange={(e, ed) => onChangeHandler(e, ed, "email")}
            label="Email"
            type="email"
            required
            value={email}
          />
          <Form.Input
            label="Password"
            type="password"
            required
            value={password}
            onChange={(e, ed) => onChangeHandler(e, ed, "pwd")}
          />
          <Form.Input
            label="Confirm Password"
            type="password"
            required
            value={confirmPassword}
            onChange={(e, ed) => onChangeHandler(e, ed, "confirm_pwd")}
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

export default SignUp;
