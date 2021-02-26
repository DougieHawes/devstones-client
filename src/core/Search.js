import { useState, useEffect } from "react";

import { getCategories, list } from "./apiCore";

import { Button2 } from "../utils/buttons";
import { Card1 } from "../utils/cards";
import { Input5, Input6 } from "../utils/inputs";

const Search = () => {
  const [data, setData] = useState({
    categories: [],
    category: "",
    search: "",
    results: [],
    searched: false,
  });

  const { categories, category, search, results, searched } = data;

  const loadCategories = () => {
    getCategories().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setData({ ...data, categories: data });
      }
    });
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const searchData = () => {
    if (search) {
      list({ search: search || undefined, category: category }).then(
        (response) => {
          if (response.error) {
            console.log(response.error);
          } else {
            setData({ ...data, results: response, searched: true });
          }
        }
      );
    }
  };

  const searchSubmit = (e) => {
    e.preventDefault();

    searchData();
  };

  const handleChange = (name) => (e) => {
    setData({ ...data, [name]: e.target.value, searched: false });
  };

  const searchMessage = (searched, results) => {
    if (searched && results.length > 0) {
      return `found ${results.length} product${
        results.length === 1 ? "" : "s"
      }`;
    }
    if (searched && results.length < 1) {
      return "no products found";
    }
  };

  const searchedProducts = (results = []) => (
    <div>
      <h2>{searchMessage(searched, results)}</h2>
      <div className="card-box">
        {results.map((product, i) => (
          <Card1 key={i} product={product} />
        ))}
      </div>
    </div>
  );

  const searchForm = () => (
    <form className="search-form" onSubmit={searchSubmit}>
      {categories && (
        <Input6
          value={category}
          options={categories}
          onChange={handleChange("category")}
        />
      )}
      <Input5 type="search" onChange={handleChange("search")} />
      <Button2 buttonText="search" />
    </form>
  );

  return (
    <div className="search">
      {searchForm()}
      <div className="search-products">{searchedProducts(results)}</div>
    </div>
  );
};

export default Search;
