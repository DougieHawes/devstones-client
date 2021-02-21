import { Link } from "react-router-dom";

import { isAuthenticated } from "../auth";

import Layout from "../core/Layout";

const AdminDashboard = () => {
  const {
    user: { _id, name, email, role },
  } = isAuthenticated();

  const adminLinks = () => {
    return (
      <div>
        <h3>admin links</h3>
        <ul>
          <li>
            <Link to="/create/category">create category</Link>
          </li>
          <li>
            <Link to="/create/product">create product</Link>
          </li>
        </ul>
      </div>
    );
  };

  const adminInfo = () => {
    return (
      <div>
        <h3>admin information</h3>
        <ul>
          <li>{name}</li>
          <li>{email}</li>
          <li>admin</li>
        </ul>
      </div>
    );
  };

  const dashboard = (
    <div className="child">
      <div>
        <div>{adminLinks()}</div>
        <div>{adminInfo()}</div>
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

export default AdminDashboard;
