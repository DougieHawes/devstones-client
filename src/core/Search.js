import { useState, useEffect } from "react";

import { getCategories, list } from "./apiCore";

import { Card1 } from "../utils/cards";

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
    <form onSubmit={searchSubmit}>
      <select onChange={handleChange("category")}>
        <option value="all">pick category</option>
        {categories.map((c, i) => (
          <option key={i} value={c._id}>
            {c.name}
          </option>
        ))}
      </select>
      <input type="search" onChange={handleChange("search")} />
      <button>search</button>
    </form>
  );

  return (
    <div>
      <div>{searchForm()}</div>
      <div>{searchedProducts(results)}</div>
    </div>
  );
};

export default Search;
