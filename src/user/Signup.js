import { useState } from "react";

import { Link, Redirect } from "react-router-dom";

import { signup, isAuthenticated } from "../auth";

import "./style.min.css";

import Layout from "../core/Layout";

import { Button1 } from "../utils/buttons";
import { Input1 } from "../utils/inputs";

const Signup = () => {
  const [state, setState] = useState({
    name: "",
    email: "",
    password: "",
    confirmpassword: "",
    error: "",
    success: "",
    showPassword: false,
    buttonText: "SUBMIT",
  });

  const {
    name,
    email,
    password,
    confirmpassword,
    error,
    success,
    showPassword,
    buttonText,
  } = state;

  const handleChange = (name) => (e) => {
    setState({ ...state, error: "", [name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmpassword) {
      return setState({ ...state, error: "passwords don't match" });
    }

    setState({ ...state, error: false });

    signup({ name, email, password }).then((data) => {
      if (data.error) {
        setState({ ...state, error: data.error, success: false });
      } else {
        setState({
          ...state,
          name: "",
          email: "",
          password: "",
          confirmpassword: "",
          error: "",
          success: true,
        });
      }
    });
  };

  const showError = () => (
    <div style={{ display: error ? "" : "none" }}>{error}</div>
  );

  const showSuccess = () => (
    <div style={{ display: success ? "" : "none" }}>
      SIGNUP SUCCESS, <Link to="/signin">signin here</Link>
    </div>
  );

  const redirectUser = () => {
    if (isAuthenticated()) {
      return (
        <Redirect
          to={
            isAuthenticated().user.role === 1
              ? "/admin/dashboard"
              : "/user/dashboard"
          }
        />
      );
    }
  };

  const signupForm = () => (
    <div className="child">
      <form className="form">
        <Input1 label="name" value={name} onChange={handleChange("name")} />
        <Input1 label="email" value={email} onChange={handleChange("email")} />
        <div
          className="show-password-toggle"
          onClick={() => setState({ ...state, showPassword: !showPassword })}
        >
          show-password
        </div>
        <Input1
          label="password"
          type={!showPassword ? "password" : "text"}
          value={password}
          onChange={handleChange("password")}
        />
        <Input1
          label="confirm"
          type={!showPassword ? "password" : "text"}
          value={confirmpassword}
          onChange={handleChange("confirmpassword")}
        />
        <Button1 onClick={handleSubmit} buttonText={buttonText} />
      </form>
      {showError()}
      {showSuccess()}
      {redirectUser()}
    </div>
  );

  return (
    <Layout
      title="signup"
      description="please register"
      children={signupForm()}
    />
  );
};

export default Signup;
