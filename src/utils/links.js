import { Link } from "react-router-dom";

import "./style.min.css";

export const ReturnLink = ({ path, page }) => (
  <div className="return-link">
    <Link to={path}>
      <i className="far fa-hand-point-left"></i> go back to {page}
    </Link>
  </div>
);
