import "./style.min.css";

import { Link } from "react-router-dom";

import ShowImage from "./ShowImage";

export const Card1 = ({ product }) => (
  <div className="card card1">
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
        <div className="card-details-add">ADD TO CART</div>
      </div>
    </div>
  </div>
);

export const Card2 = ({ product }) => {
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
      <div className="card-image">
        <ShowImage item={product} url="product" />
      </div>
      <div className="card-details">
        <h4 className="card-title">{product.name}</h4>
        <p className="card-details-description">{product.description}</p>
        <div className="card-details-purchase">
          <p>{qtyButton(product.quantity)}</p>
          <p className="card-price">£ {product.price}</p>
          <div className="card-details-add">ADD TO CART</div>
        </div>
      </div>
    </div>
  );
};
