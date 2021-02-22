import { useState } from "react";

import { Redirect } from "react-router-dom";

import { signin, authenticate, isAuthenticated } from "../auth";

import "./style.min.css";

import Layout from "../core/Layout";

import { Button1 } from "../utils/buttons";
import { Input1 } from "../utils/inputs";

const Signin = () => {
  const [state, setState] = useState({
    email: "",
    password: "",
    error: "",
    showPassword: false,
    loading: false,
    redirect: false,
    buttonText: "SUBMIT",
  });

  const {
    email,
    password,
    error,
    showPassword,
    loading,
    redirect,
    buttonText,
  } = state;

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
          to={
            isAuthenticated().user.role === 1
              ? "/admin/dashboard"
              : "/user/dashboard"
          }
        />
      );
    }
  };

  const signinForm = () => (
    <div className="child">
      <form className="form">
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
        <Button1 onClick={handleSubmit} buttonText={buttonText} />
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
