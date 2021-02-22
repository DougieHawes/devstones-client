import { useState } from "react";

import { createCategory } from "./apiAdmin";

import { isAuthenticated } from "../auth";

import "./style.min.css";

import Layout from "../core/Layout";

import { Button1 } from "../utils/buttons";
import { Input1 } from "../utils/inputs";
import { ReturnLink } from "../utils/links";

const AddCategory = () => {
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const { user, token } = isAuthenticated();

  const handleChange = (e) => {
    setError("");

    setName(e.target.value);
  };

  const clickSubmit = (e) => {
    e.preventDefault();

    setError("");

    setSuccess(false);

    createCategory(user._id, token, { name }).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setError("");
        setSuccess(true);
      }
    });
  };

  const showSuccess = () => {
    if (success) {
      return <h3 className="alert alert-success">{name} is created</h3>;
    }
  };

  const showError = () => {
    if (error) {
      return (
        <h3 className="alert alert-failure">
          the category "{name}" already exists
        </h3>
      );
    }
  };

  const newCategoryForm = () => (
    <div className="child">
      <ReturnLink path="/admin/dashboard" page="dashboard" />
      <form className="form" onSubmit={clickSubmit}>
        <Input1 label="category name" value={name} onChange={handleChange} />
        <Button1 buttonText="create category" />
      </form>
      {showSuccess()}
      {showError()}
    </div>
  );

  return (
    <Layout
      title="add category"
      description="please enter a new category"
      children={newCategoryForm()}
    />
  );
};

export default AddCategory;
