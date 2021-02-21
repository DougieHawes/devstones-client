import { useState } from "react";

import { Link, Redirect } from "react-router-dom";

import { signup, isAuthenticated } from "../auth";

import Layout from "../core/Layout";

const Signup = () => {
  const [state, setState] = useState({
    name: "",
    email: "",
    password: "",
    confirmpassword: "",
    error: "",
    success: "",
    buttonText: "SUBMIT",
  });

  const {
    name,
    email,
    password,
    confirmpassword,
    error,
    success,
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
        <div className="form-group">
          <label className="form-group-label">name</label>
          <input
            value={name}
            onChange={handleChange("name")}
            type="text"
            className="input"
          />
        </div>
        <div className="form-group">
          <label className="form-group-label">email</label>
          <input
            value={email}
            onChange={handleChange("email")}
            type="text"
            className="input"
          />
        </div>
        <div className="form-group">
          <label className="form-group-label">password</label>
          <input
            value={password}
            onChange={handleChange("password")}
            type="text"
            className="input"
          />
        </div>
        <div className="form-group">
          <label className="form-group-label">confirm password</label>
          <input
            value={confirmpassword}
            onChange={handleChange("confirmpassword")}
            type="text"
            className="input"
          />
        </div>
        <button onClick={handleSubmit} className="button">
          {buttonText}
        </button>
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
