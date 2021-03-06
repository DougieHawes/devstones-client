import "./style.min.css";

import { BrowserRouter, Switch, Route } from "react-router-dom";

import AdminRoute from "./auth/AdminRoute";
import PrivateRoute from "./auth/PrivateRoute";

import Home from "./core/Home";
import Shop from "./core/Shop";
import Cart from "./core/Cart";
import Product from "./core/Product";

import Signup from "./user/Signup";
import Signin from "./user/Signin";

import AdminDashboard from "./user/AdminDashboard";
import UserDashboard from "./user/UserDashboard";

import AddCategory from "./admin/AddCategory";
import AddProduct from "./admin/AddProduct";

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/signin" component={Signin} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/shop" component={Shop} />
        <Route exact path="/cart" component={Cart} />
        <Route exact path="/product/:productId" component={Product} />
        <PrivateRoute exact path="/user/dashboard" component={UserDashboard} />
        <AdminRoute exact path="/admin/dashboard" component={AdminDashboard} />
        <AdminRoute exact path="/create/category" component={AddCategory} />
        <AdminRoute exact path="/create/product" component={AddProduct} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
