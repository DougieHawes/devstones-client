import "./style.min.css";

import Menu from "./Menu";

const Layout = ({ title, description, className, children }) => {
  return (
    <div className="layout">
      <Menu />
      <div className="layout-body">
        <div className="jumbotron">
          <h2 className="jumbotron-title">{title}</h2>
          <p className="jumbotron-description">{description}</p>
        </div>
        <div className={`page-body ${className}`}>{children}</div>
      </div>
    </div>
  );
};

export default Layout;
