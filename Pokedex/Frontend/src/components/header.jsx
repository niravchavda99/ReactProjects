import React, { Component } from "react";
import SearchBox from "./common/searchBox";
import Select from "./common/select";

class Header extends Component {
  render() {
    const {
      searchQuery,
      onChange,
      onSort,
      onFilter,
      getSortOptions,
      getFilterOptions,
    } = this.props;
    return (
      <div className="container">
        <div
          className="navbar navbar-light"
          style={{
            // backgroundColor: "rgba(0, 0, 0, 0.8)",
            backgroundColor: "#fff",
            marginBottom: "5px",
            borderRadius: "5px",
          }}
        >
          <SearchBox
            placeholder={`Search by name or number...`}
            value={searchQuery}
            onChange={onChange}
          />
          <Select
            name={"filterType"}
            options={getFilterOptions()}
            onSelect={onFilter}
          />
          <Select
            name={"sortBy"}
            options={getSortOptions()}
            onSelect={onSort}
          />
        </div>
      </div>
    );
  }
}

export default Header;
