import { useState, useEffect } from "react";

import DropIn from "braintree-web-drop-in-react";

import { Link, Redirect } from "react-router-dom";

import { getBraintreeClientToken, processPayment } from "./apiCore";
import { emptyCart } from "./cartHelpers";

import { isAuthenticated } from "../auth";

const Checkout = ({ products }) => {
  const [data, setData] = useState({
    success: "",
    error: "",
    address: "",
    clientToken: null,
    instance: {},
    loading: "",
    redirect: false,
  });

  const userId = isAuthenticated() && isAuthenticated().user._id;
  const token = isAuthenticated() && isAuthenticated().token;

  const getToken = (userId, token) => {
    getBraintreeClientToken(userId, token).then((data) => {
      if (data.error) {
        setData({ ...data, error: data.error });
      } else {
        setData({ clientToken: data.clientToken });
      }
    });
  };

  useEffect(() => {
    getToken(userId, token);
  }, []);

  const getTotal = () => {
    return products.reduce((currentValue, nextValue) => {
      return currentValue + nextValue.count * nextValue.price;
    }, 0);
  };

  const buy = () => {
    setData({ loading: true });
    let nonce;
    let getNonce = data.instance
      .requestPaymentMethod()
      .then((data) => {
        nonce = data.nonce;

        const paymentData = {
          paymentMethodNonce: nonce,
          amount: getTotal(products),
        };

        processPayment(userId, token, paymentData)
          .then((response) => {
            // console.log(response);
            setData({ ...data, success: response.success });

            emptyCart(() => {
              console.log("payment success and empty cart");
              setData({ loading: false });
            });

            setTimeout(() => setData({ ...data, redirect: true }), 3000);
          })
          .catch((err) => {
            console.log("ERROR: " + err);
            setData({ loading: false });
          });
      })
      .catch((error) => {
        // console.log("dropin error: ", error);
        setData({ ...data, error: error.message });
      });
  };

  const showError = (error) => (
    <div style={{ display: error ? "" : "none" }}>{error}</div>
  );

  const showSuccess = (success) => (
    <div style={{ display: success ? "" : "none" }}>payment successful</div>
  );

  return (
    <div>
      <div>total: £{getTotal()}</div> :
      {isAuthenticated() ? (
        <div onBlur={() => setData({ ...data, error: "" })}>
          {showSuccess(data.success)}
          {showError(data.error)}
          {data.loading && <div>LOADING...</div>}
          {data.redirect && <Redirect to="/" />}
          {data.clientToken !== null && products.length > 0 ? (
            <div>
              <DropIn
                options={{
                  authorization: data.clientToken,
                  paypal: { flow: "vault" },
                }}
                onInstance={(instance) => (data.instance = instance)}
              />
              <button onClick={buy}>pay</button>
            </div>
          ) : null}
        </div>
      ) : (
        <Link to="/signin">sign in to check out</Link>
      )}
    </div>
  );
};

export default Checkout;
