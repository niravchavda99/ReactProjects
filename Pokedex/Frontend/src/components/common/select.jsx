import React from "react";

const Select = ({ name, options, onSelect }) => {
  return (
    <select
      name={name}
      id={name}
      className="form-control sort-by"
      onChange={onSelect}
      style={{ borderBottom: "1px solid #ddd" }}
    >
      {options.map((option) => (
        <option
          key={option.optionValue}
          style={{ fontSize: "15px" }}
          value={option.optionValue}
        >
          {option.optionName}
        </option>
      ))}
    </select>
  );
};

export default Select;
