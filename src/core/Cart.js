import { useState, useEffect } from "react";

import Layout from "./Layout";

import { getCart } from "./cartHelpers";

import Checkout from "./Checkout";

import { Card3 } from "../utils/cards";

const Cart = () => {
  const [items, setItems] = useState([]);
  const [run, setRun] = useState(false);

  useEffect(() => {
    setItems(getCart());
  }, [run]);

  const cart = (
    <div className="child cart">
      <h2>you have {`${items.length}`} items in your cart</h2>
      {items.map((product, i) => (
        <Card3 key={i} product={product} setRun={setRun} run={run} />
      ))}
      <Checkout products={items} />
    </div>
  );

  return (
    <Layout
      title="your cart"
      description="view and manage your cart items"
      children={cart}
    />
  );
};

export default Cart;
