import { useState } from "react";

const CheckBox = ({ categories, handleFilters }) => {
  const [checked, setChecked] = useState([]);

  const handleToggle = (c) => () => {
    const currentCategoryId = checked.indexOf(c);
    const newCheckedCategoryId = [...checked];
    if (currentCategoryId === -1) {
      newCheckedCategoryId.push(c);
    } else {
      newCheckedCategoryId.splice(currentCategoryId, 1);
    }
    setChecked(newCheckedCategoryId);
    handleFilters(newCheckedCategoryId);
  };

  return categories.map((c, i) => (
    <li className="shop-filter-button" key={i}>
      <input
        onChange={handleToggle(c._id)}
        value={checked.indexOf(c._id === 1)}
        type="checkbox"
      />
      <label> {c.name}</label>
    </li>
  ));
};

export default CheckBox;
