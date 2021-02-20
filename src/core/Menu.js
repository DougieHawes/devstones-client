import { Link, NavLink, withRouter } from "react-router-dom";

import "./style.min.css";

const Menu = ({ history }) => {
  return (
    <div>
      <Link activeClassName="active-link" to="/">
        HOME
      </Link>
      <NavLink activeClassName="active-link" to="/signup">
        SIGNUP
      </NavLink>
      <NavLink activeClassName="active-link" to="/signin">
        SIGNIN
      </NavLink>
    </div>
  );
};

export default withRouter(Menu);
