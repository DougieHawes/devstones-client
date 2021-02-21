import { Fragment } from "react";

import { Link, NavLink, withRouter } from "react-router-dom";

import { signout, isAuthenticated } from "../auth";

import "./style.min.css";

const Menu = (history) => {
  return (
    <div className="menu">
      <div className="title-box">
        <Link className="link" to="/">
          <h1 className="title">DevStones</h1>
        </Link>
      </div>
      <div className="links-box">
        {!isAuthenticated() && (
          <Fragment>
            <NavLink
              className="link"
              activeClassName="active-link"
              to="/signup"
            >
              SIGNUP
            </NavLink>
            <NavLink
              className="link"
              activeClassName="active-link"
              to="/signin"
            >
              SIGNIN
            </NavLink>
          </Fragment>
        )}

        {isAuthenticated() && (
          <Link className="link" to="/">
            <span onClick={() => signout()}>SIGNOUT</span>
          </Link>
        )}
      </div>
    </div>
  );
};

export default withRouter(Menu);
