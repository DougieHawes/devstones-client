import { Link } from "react-router-dom";

import { isAuthenticated } from "../auth";

import "./style.min.css";

import Layout from "../core/Layout";

const AdminDashboard = () => {
  const {
    user: { _id, name, email, role },
  } = isAuthenticated();

  const adminLinks = () => {
    return (
      <div className="dashboard-card">
        <h3 className="dashboard-card-title">admin links</h3>
        <ul className="dashboard-card-items">
          <li className="dashboard-card-item">
            <Link to="/create/category">create category</Link>
          </li>
          <li className="dashboard-card-item">
            <Link to="/create/product">create product</Link>
          </li>
        </ul>
      </div>
    );
  };

  const adminInfo = () => {
    return (
      <div className="dashboard-card">
        <h3 className="dashboard-card-title">admin information</h3>
        <ul className="dashboard-card-items">
          <li className="dashboard-card-item">{name}</li>
          <li className="dashboard-card-item">{email}</li>
          <li className="dashboard-card-item">admin</li>
        </ul>
      </div>
    );
  };

  const dashboard = () => (
    <div className="child">
      <div className="dashboard">
        <div className="dashboard-column">{adminLinks()}</div>
        <div className="dashboard-column">{adminInfo()}</div>
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

export default AdminDashboard;
