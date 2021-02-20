import { Link, NavLink, withRouter } from "react-router-dom";

import "./style.min.css";

const Menu = () => {
  return (
    <div className="menu">
      <div className="title-box">
        <Link className="link" to="/">
          <h1 className="title">DevStones</h1>
        </Link>
      </div>
      <div className="links-box">
        <NavLink className="link" activeClassName="active-link" to="/signup">
          SIGNUP
        </NavLink>
        <NavLink className="link" activeClassName="active-link" to="/signin">
          SIGNIN
        </NavLink>
      </div>
    </div>
  );
};

export default withRouter(Menu);
