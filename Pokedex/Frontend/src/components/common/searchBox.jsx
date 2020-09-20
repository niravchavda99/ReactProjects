import React from "react";

const SearchBox = ({ value, placeholder, onChange }) => {
  return (
    <React.Fragment>
      <input
        type="text"
        name="query"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.currentTarget.value)}
        className="form-control my-3 search-bar"
        style={{
          border: "0",
          outline: "0",
          background: "transparent",
          borderBottom: "1px solid #ddd",
        }}
      />
    </React.Fragment>
  );
};

export default SearchBox;
