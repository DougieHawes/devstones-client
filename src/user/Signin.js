import { useState } from "react";

import { Redirect } from "react-router-dom";

import { signin, authenticate, isAuthenticated } from "../auth";

import Layout from "../core/Layout";

const Signin = () => {
  const [state, setState] = useState({
    email: "",
    password: "",
    error: "",
    loading: false,
    redirect: false,
    buttonText: "SUBMIT",
  });

  const { email, password, error, loading, redirect, buttonText } = state;

  const { user } = isAuthenticated();

  const handleChange = (name) => (e) => {
    setState({ ...state, error: "", [name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setState({
      ...state,
      error: false,
      loading: true,
      buttonText: "SUBMITTING",
    });

    signin({ email, password }).then((data) => {
      if (data.error) {
        setState({
          ...state,
          error: data.error,
          loading: false,
          buttonText: "SUBMIT",
        });
      } else {
        authenticate(data, () => [
          setState({
            ...state,
            redirect: true,
          }),
        ]);
      }
    });
  };

  const showError = () => (
    <div style={{ display: error ? "" : "none" }}>{error}</div>
  );

  const showLoading = () => (
    <div style={{ display: loading ? "" : "none" }}>LOADING...</div>
  );

  const redirectUser = () => {
    if (redirect || isAuthenticated()) {
      return (
        <Redirect
          to={user.role === 1 ? "/admin/dashboard" : "/user/dashboard"}
        />
      );
    }
  };

  const signinForm = () => (
    <div className="child">
      <form className="form">
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
        <button onClick={handleSubmit} className="button">
          {buttonText}
        </button>
      </form>
      {showError()}
      {showLoading()}
      {redirectUser()}
    </div>
  );

  return (
    <Layout
      title="signin"
      description="please register"
      children={signinForm()}
    />
  );
};

export default Signin;
