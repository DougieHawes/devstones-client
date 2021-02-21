import "./style.min.css";

import { BrowserRouter, Switch, Route } from "react-router-dom";

import AdminRoute from "./auth/AdminRoute";
import PrivateRoute from "./auth/PrivateRoute";

import Home from "./core/Home";

import Signup from "./user/Signup";
import Signin from "./user/Signin";

import AdminDashboard from "./user/AdminDashboard";
import UserDashboard from "./user/UserDashboard";

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/signin" component={Signin} />
        <Route exact path="/signup" component={Signup} />
        <PrivateRoute exact path="/user/dashboard" component={UserDashboard} />
        <AdminRoute exact path="/admin/dashboard" component={AdminDashboard} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
