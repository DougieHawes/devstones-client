import { useState, useEffect } from "react";

import { getCategories, getFilteredProducts } from "./apiCore";

import Layout from "./Layout";

import CheckBox from "./CheckBox";
import RadioBox from "./RadioBox";

import { prices } from "./fixedPrices";

import { Card1 } from "../utils/cards";

const Shop = () => {
  const [myFilters, setMyFilters] = useState({
    filters: { category: [], price: [] },
  });
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(false);
  const [limit, setLimit] = useState(6);
  const [skip, setSkip] = useState(0);
  const [filteredResults, setFilteredResults] = useState([]);

  const init = () => {
    getCategories().then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setCategories(data);
      }
    });
  };

  const loadFilteredResults = (newFilters) => {
    getFilteredProducts(skip, limit, newFilters).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setFilteredResults(data.data);
        setSkip(0);
      }
    });
  };

  useEffect(() => {
    init();
    loadFilteredResults(skip, limit, myFilters.filters);
  }, []);

  const handleFilters = (filters, filterBy) => {
    const newFilters = { ...myFilters };

    newFilters.filters[filterBy] = filters;

    if (filterBy === "price") {
      let priceValues = handlePrice(filters);

      newFilters.filters[filterBy] = priceValues;
    }

    loadFilteredResults(myFilters.filters);

    setMyFilters(newFilters);
  };

  const handlePrice = (value) => {
    const data = prices;
    let array = [];

    for (let key in data) {
      if (data[key]._id === parseInt(value)) {
        array = data[key].array;
      }
    }

    return array;
  };

  const shop = (
    <div className="child">
      <div>
        <h4>filter by categories</h4>
        <ul>
          <CheckBox
            categories={categories}
            handleFilters={(filters) => handleFilters(filters, "category")}
          />
        </ul>
        <h4>filter by price</h4>
        <div>
          <RadioBox
            prices={prices}
            handleFilters={(filters) => handleFilters(filters, "price")}
          />
        </div>
      </div>
      <div>{JSON.stringify(filteredResults)}</div>
    </div>
  );

  return (
    <Layout
      title="devstones"
      description="online bookstore for developers and programmers"
      children={shop}
    />
  );
};

export default Shop;
