import { Link } from "react-router-dom";

import { isAuthenticated } from "../auth";

import "./style.min.css";

import Layout from "../core/Layout";

const UserDashboard = () => {
  const {
    user: { _id, name, email, role },
  } = isAuthenticated();

  const userLinks = () => {
    return (
      <div className="dashboard-card">
        <h3 className="dashboard-card-title">user links</h3>
        <ul className="dashboard-card-items">
          <li className="dashboard-card-item">
            <Link to="/cart">my cart</Link>
          </li>
          <li className="dashboard-card-item">
            <Link to="/profile/update">update profile</Link>
          </li>
        </ul>
      </div>
    );
  };

  const userInfo = () => {
    return (
      <div className="dashboard-card">
        <h3 className="dashboard-card-title">user information</h3>
        <ul className="dashboard-card-items">
          <li className="dashboard-card-item">{name}</li>
          <li className="dashboard-card-item">{email}</li>
          <li className="dashboard-card-item">user</li>
        </ul>
      </div>
    );
  };

  const purchaseHistory = () => {
    return (
      <div className="dashboard-card">
        <h3 className="dashboard-card-title">purchase history</h3>
        <ul className="dashboard-card-items">
          <li className="dashboard-card-item">history</li>
        </ul>
      </div>
    );
  };

  const dashboard = () => (
    <div className="child">
      <div className="dashboard">
        <div className="dashboard-column">{userLinks()}</div>
        <div className="dashboard-column">
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
      children={dashboard()}
    />
  );
};

export default UserDashboard;
