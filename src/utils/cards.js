import { useState } from "react";

import "./style.min.css";

import { Link, Redirect } from "react-router-dom";

import { addItem, updateItem, removeItem } from "../core/cartHelpers";

import ShowImage from "./ShowImage";

export const Card1 = ({ product }) => {
  const [redirect, setRedirect] = useState(false);

  const addToCart = () => {
    addItem(product, () => {
      setRedirect(true);
    });
  };

  return (
    <div className="card card1">
      {redirect && <Redirect to="/cart" />}
      <h4 className="card-title">{product.name}</h4>
      <div className="card-image">
        <Link to={`/product/${product._id}`}>
          <ShowImage item={product} url="product" />
        </Link>
      </div>
      <div className="card-details">
        <p className="card-details-description">
          {product.description.substring(0, 140)}
        </p>
        <div className="card-details-purchase">
          <p className="card-price">£ {product.price}</p>
          <Link to={`/product/${product._id}`}>
            <div className="card-details-link">VIEW PRODUCT</div>
          </Link>
          <div className="card-details-add" onClick={addToCart}>
            ADD TO CART
          </div>
        </div>
      </div>
    </div>
  );
};

export const Card2 = ({ product }) => {
  const [redirect, setRedirect] = useState(false);

  const addToCart = () => {
    addItem(product, () => {
      setRedirect(true);
    });
  };

  const qtyButton = (qty) => {
    if (qty === 0) {
      return "out of stock";
    } else if (qty < 50) {
      return "limited stock remaining";
    } else {
      return "in stock";
    }
  };

  return (
    <div className="card card2">
      {redirect && <Redirect to="/cart" />}
      <div className="card-image">
        <ShowImage item={product} url="product" />
      </div>
      <div className="card-details">
        <h4 className="card-title">{product.name}</h4>
        <p className="card-details-description">{product.description}</p>
        <div className="card-details-purchase">
          <p>{qtyButton(product.quantity)}</p>
          <p className="card-price">£ {product.price}</p>
          <div className="card-details-add" onClick={addToCart}>
            ADD TO CART
          </div>
        </div>
      </div>
    </div>
  );
};

export const Card3 = ({ product, setRun = (f) => f, run = undefined }) => {
  const [count, setCount] = useState(product.count);

  const handleChange = (productId) => (e) => {
    setRun(!run);

    setCount(e.target.value < 1 ? 1 : e.target.value);

    if (e.target.value >= 1) {
      updateItem(productId, e.target.value);
    }
  };

  return (
    <div className="card card3">
      <h4 className="card-title">{product.name}</h4>
      <div className="card-details">
        <div className="card-image">
          <Link to={`/product/${product._id}`}>
            <ShowImage item={product} url="product" />
          </Link>
        </div>
        <div className="card-details-description">
          {product.description.substring(0, 350)}
        </div>
        <div className="card-details-purchase">
          <p className="card-price">£ {product.price}</p>
          <div className="qty-adjust">
            <p className="qty-adjust-toggle">QTY:</p>
            <input
              type="number"
              value={count}
              onChange={handleChange(product._id)}
            />
          </div>
          <div
            onClick={() => {
              removeItem(product._id);
              setRun(!run);
            }}
          >
            REMOVE
          </div>
        </div>
      </div>
    </div>
  );
};
