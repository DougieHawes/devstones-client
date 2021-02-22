import "./style.min.css";

import { Link } from "react-router-dom";

import ShowImage from "./ShowImage";

export const Card1 = ({ product }) => (
  <div className="card card1">
    <h4 className="card-title">{product.name}</h4>
    <div className="card-image">
      <ShowImage item={product} url="product" />
    </div>
    <div className="card-details">
      <p className="card-details-description">
        {product.description.substring(0, 140)}
      </p>
      <div className="card-details-purchase">
        <p className="card-price">£ {product.price}</p>
        <Link to="/product">
          <div className="card-details-link">VIEW PRODUCT</div>
        </Link>
        <div className="card-details-add">ADD TO CART</div>
      </div>
    </div>
  </div>
);
