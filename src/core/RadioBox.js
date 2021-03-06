import { useState, useEffect, Fragment } from "react";

const RadioBox = ({ prices, handleFilters }) => {
  const [value, setValue] = useState(0);

  const handleChange = (e) => {
    handleFilters(e.target.value);

    setValue(e.target.value);
  };

  return prices.map((p, i) => (
    <div className="shop-filter-button" key={i}>
      <input onChange={handleChange} value={`${p._id}`} name={p} type="radio" />
      <label> {p.name}</label>
    </div>
  ));
};

export default RadioBox;
