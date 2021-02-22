import { useState, useEffect } from "react";

import Layout from "./Layout";

import { getProducts } from "./apiCore";

import Search from "./Search";

import { Card1 } from "../utils/cards";

const Home = () => {
  const [productsBySell, setProductsBySell] = useState([]);
  const [productsByArrival, setProductsByArrival] = useState([]);
  const [error, setError] = useState("");

  const loadProductsBySell = () => {
    getProducts("sold").then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setProductsBySell(data);
      }
    });
  };

  const loadProductsByArrival = () => {
    getProducts("createdAt").then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setProductsByArrival(data);
      }
    });
  };

  useEffect(() => {
    loadProductsBySell();
    loadProductsByArrival();
  }, []);

  const home = (
    <div className="child">
      <Search />
      <h2>new arrivals</h2>
      <div className="card-box">
        {productsByArrival.map((product, id) => {
          return <Card1 key={id} product={product} />;
        })}
      </div>
      <h2>new arrivals</h2>
      <div className="card-box">
        {productsBySell.map((product, id) => {
          return <Card1 key={id} product={product} />;
        })}
      </div>
    </div>
  );

  return (
    <Layout
      title="devstones"
      description="online bookstore for developers and programmers"
      children={home}
    />
  );
};

export default Home;
