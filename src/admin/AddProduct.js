import { useState, useEffect } from "react";

import { createProduct, getCategories } from "./apiAdmin";

import { isAuthenticated } from "../auth";

import "./style.min.css";

import Layout from "../core/Layout";

import { Button1 } from "../utils/buttons";
import { Input1, Input2, Input3, Input4 } from "../utils/inputs";
import { ReturnLink } from "../utils/links";

const AddProduct = () => {
  const [state, setState] = useState({
    name: "",
    description: "",
    price: "",
    categories: [],
    category: "",
    shipping: "",
    quantity: "",
    photo: "",
    error: "",
    createdProduct: "",
    formData: "",
    loading: false,
  });

  const {
    name,
    description,
    price,
    categories,
    category,
    shipping,
    quantity,
    error,
    createdProduct,
    formData,
    loading,
  } = state;

  const { user, token } = isAuthenticated();

  const init = () => {
    getCategories().then((data) => {
      if (data.error) {
        setState({ ...state, error: data.error });
      } else {
        setState({
          ...state,
          categories: data,
          formData: new FormData(),
        });
      }
    });
  };

  useEffect(() => {
    init();
  }, []);

  const handleChange = (name) => (e) => {
    const value = name === "photo" ? e.target.files[0] : e.target.value;

    formData.set(name, value);

    setState({ ...state, [name]: value });
  };

  const clickSubmit = (e) => {
    e.preventDefault();

    setState({ ...state, error: "", loading: true });

    createProduct(user._id, token, formData).then((data) => {
      if (data.error) {
        setState({ ...state, error: data.error });
      } else {
        setState({
          ...state,
          name: "",
          description: "",
          photo: "",
          price: "",
          quantity: "",
          loading: false,
          createdProduct: data.name,
        });
      }
    });
  };

  const showError = () => {
    if (error) {
      return (
        <h3
          className="alert alert-failure"
          style={{ display: error ? "" : "none" }}
        >
          {error}
        </h3>
      );
    }
  };

  const showSuccess = () => {
    if (error) {
      return (
        <h3
          className="alert alert-success"
          style={{ display: createdProduct ? "" : "none" }}
        >
          {`${createdProduct} added`}
        </h3>
      );
    }
  };

  const showLoading = () =>
    loading && (
      <h3
        className="alert alert-success"
        style={{ display: createdProduct ? "" : "none" }}
      >
        {`${createdProduct} added`}
      </h3>
    );

  const newProductForm = () => (
    <div className="child">
      <ReturnLink path="/admin/dashboard" page="dashboard" />
      <form className="form" onSubmit={clickSubmit}>
        <Input4 label="photo" onChange={handleChange("photo")} />

        <Input1 label="name" value={name} onChange={handleChange("name")} />
        <Input2
          label="description"
          value={description}
          onChange={handleChange("description")}
        />
        <Input1
          label="price"
          type="number"
          value={price}
          onChange={handleChange("price")}
        />
        {categories && (
          <Input3
            label="category"
            value={category}
            options={categories}
            onChange={handleChange("category")}
          />
        )}
        <Input3
          label="shipping"
          value={shipping}
          options={[
            { _id: 0, name: "not included" },
            { _id: 1, name: "included" },
          ]}
          onChange={handleChange("shipping")}
        />
        <Input1
          label="quantity"
          type="number"
          value={quantity}
          onChange={handleChange("quantity")}
        />
        <Button1 buttonText="create product" />
      </form>
      {showError()}
      {showSuccess()}
      {showLoading()}
    </div>
  );

  return (
    <Layout
      title="add product"
      description="please enter a new product"
      children={newProductForm()}
    />
  );
};

export default AddProduct;
