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
  const [size, setSize] = useState(0);
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
        setSize(data.size);
        setSkip(0);
      }
    });
  };

  const loadMore = () => {
    let toSkip = skip + limit;

    getFilteredProducts(toSkip, limit, myFilters.filters).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setFilteredResults([...filteredResults, ...data.data]);
        setSize(data.size);
        setSkip(toSkip);
      }
    });
  };

  const loadMoreButton = () => {
    return (
      size > 0 &&
      size >= limit && (
        <button className="load-more-button" onClick={loadMore}>
          load more
        </button>
      )
    );
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
    <div className="child shop">
      <div className="shop-filter">
        <h4 className="shop-filter-heading">filter by categories</h4>
        <ul className="shop-filter-buttons">
          <CheckBox
            categories={categories}
            handleFilters={(filters) => handleFilters(filters, "category")}
          />
        </ul>
        <h4 className="shop-filter-heading">filter by price</h4>
        <div className="shop-filter-buttons">
          <RadioBox
            prices={prices}
            handleFilters={(filters) => handleFilters(filters, "price")}
          />
        </div>
      </div>
      <div className="shop-items">
        <div className="shop-cards">
          {filteredResults.map((product, i) => (
            <Card1 key={i} product={product} />
          ))}
        </div>
        {loadMoreButton()}
      </div>
    </div>
  );

  return (
    <Layout
      title="shop"
      description="select books by category and price range"
      children={shop}
    />
  );
};

export default Shop;
