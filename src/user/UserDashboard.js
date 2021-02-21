import { Link } from "react-router-dom";

import { isAuthenticated } from "../auth";

import Layout from "../core/Layout";

const UserDashboard = () => {
  const {
    user: { _id, name, email, role },
  } = isAuthenticated();

  const userLinks = () => {
    return (
      <div>
        <h3>user links</h3>
        <ul>
          <li>
            <Link to="/cart">my cart</Link>
          </li>
          <li>
            <Link to="/profile/update">update profile</Link>
          </li>
        </ul>
      </div>
    );
  };

  const userInfo = () => {
    return (
      <div>
        <h3>user information</h3>
        <ul>
          <li>{name}</li>
          <li>{email}</li>
          <li>user</li>
        </ul>
      </div>
    );
  };

  const purchaseHistory = () => {
    return (
      <div>
        <h3>purchase history</h3>
        <ul>
          <li>history</li>
        </ul>
      </div>
    );
  };

  const dashboard = (
    <div className="child">
      <div>
        <div>{userLinks()}</div>
        <div>
          {userInfo()}
          {purchaseHistory()}
        </div>
      </div>
    </div>
  );

  return (
    <Layout
      title="dashboard"
      description={`welcome ${name}!`}
      children={dashboard}
    />
  );
};

export default UserDashboard;
