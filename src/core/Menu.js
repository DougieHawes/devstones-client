import { Fragment } from "react";

import { Link, NavLink, withRouter } from "react-router-dom";

import { signout, isAuthenticated } from "../auth";
import { itemTotal } from "./cartHelpers";

import "./style.min.css";

const Menu = (history) => {
  const { user } = isAuthenticated();

  return (
    <div className="menu">
      <div className="title-box">
        <Link to="/">
          <h1 className="title">DevStones</h1>
        </Link>
      </div>
      <div className="links-box">
        <Fragment>
          <NavLink className="link" activeClassName="active-link" to="/shop">
            SHOP <i className="fas fa-store-alt"></i>
          </NavLink>
        </Fragment>
        {!isAuthenticated() && (
          <Fragment>
            <NavLink
              className="link"
              activeClassName="active-link"
              to="/signin"
            >
              SIGNIN <i className="fas fa-sign-in-alt"></i>
            </NavLink>
          </Fragment>
        )}
        {isAuthenticated() && (
          <Fragment>
            <NavLink
              className="link"
              activeClassName="active-link"
              to={user.role === 1 ? "/admin/dashboard" : "/user/dashboard"}
            >
              DASHBOARD <i className="fas fa-user-alt"></i>
            </NavLink>
            <NavLink className="link" activeClassName="active-link" to="/cart">
              CART <i className="fas fa-shopping-cart"></i>
              <span className="item-total">
                {itemTotal() > 0 && itemTotal()}
              </span>
            </NavLink>
            <Link className="link" to="/">
              <span onClick={() => signout()}>
                SIGNOUT <i className="fas fa-sign-out-alt"></i>
              </span>
            </Link>
          </Fragment>
        )}
      </div>
    </div>
  );
};

export default withRouter(Menu);
