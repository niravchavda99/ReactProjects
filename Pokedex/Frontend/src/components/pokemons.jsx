import React, { Component } from "react";
import axios from "axios";
import { paginate } from "../utils/paginate";
import { pad } from "../utils/pokemonUtils";
import Pagination from "./common/pagination";
import _ from "lodash";
import PokemonCard from "./pokemonCard";
import Header from "./header";

class Pokemons extends Component {
  state = {
    pokemons: [],
    types: [],
    pageSize: 80,
    currentPage: 1,
    searchQuery: "",
    filterType: "All",
    sortColumn: {
      path: "pokemonNumber",
      order: "asc",
    },
  };

  async componentDidMount() {
    await this.populatePokemons();
  }

  populatePokemons = async () => {
    const apiEndPoint = "https://pokedex-backend99.herokuapp.com/api";
    // const apiEndPoint = "http://localhost:3001/api";

    const { data: pokemons } = await axios.get(`${apiEndPoint}/pokemons`);
    // const { data: pokemons } = await axios.get(
    // "http://localhost:3001/api/pokemons"
    // );
    const { data: types } = await axios.get(`${apiEndPoint}/types`);
    this.setState({ pokemons, types });
  };

  handlePageChange = (page) => this.setState({ currentPage: page });

  handleTypeSelect = (type) =>
    this.setState({ selectedType: type, searchQuery: "", currentPage: 1 });

  handleSort = (e) => {
    const selectedValue = +e.target.value;
    let sortColumn = this.state;
    switch (selectedValue) {
      case 1:
        sortColumn = { path: "pokemonNumber", order: "asc" };
        break;
      case 2:
        sortColumn = { path: "pokemonNumber", order: "desc" };
        break;
      case 3:
        sortColumn = { path: "pokemonName", order: "asc" };
        break;
      case 4:
        sortColumn = { path: "pokemonName", order: "desc" };
        break;
      default:
        sortColumn = { path: "pokemonNumber", order: "asc" };
        break;
    }
    this.setState({ sortColumn });
  };

  handleFiltering = (e) => {
    const filterType = e.target.value;
    this.setState({ filterType });
  };

  getPagedData = () => {
    let {
      pageSize,
      currentPage,
      pokemons: allPokemons,
      searchQuery,
      sortColumn,
      filterType,
    } = this.state;

    let filteredPokemons = allPokemons;

    if (searchQuery)
      filteredPokemons = allPokemons.filter((pokemon) => {
        const { pokemonNumber, pokemonName, alternateFormName } = pokemon;

        let name = pokemonName;
        if (alternateFormName) {
          if (
            alternateFormName.startsWith("Mega") ||
            alternateFormName.startsWith("Gigantamax")
          )
            name = alternateFormName + " " + name;
          else {
            name += "(" + alternateFormName + ")";
          }
        }

        return (
          name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          pad(pokemonNumber, 3)
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
        );
      });
    if (filterType !== "All") {
      filteredPokemons = filteredPokemons.filter((pokemon) => {
        const { primaryType, secondaryType } = pokemon;
        return (
          primaryType === filterType ||
          (secondaryType && secondaryType === filterType)
        );
      });
    }

    const sortedPokemons = _.orderBy(
      filteredPokemons,
      [sortColumn.path],
      [sortColumn.order]
    );

    const pokemons = paginate(sortedPokemons, currentPage, pageSize);
    return { totalCount: sortedPokemons.length, pokemons };
  };

  handleSearchByName = (query) => {
    this.setState({ searchQuery: query, selectedType: null, currentPage: 1 });
  };

  getSortOptions = () => {
    return [
      { optionName: "Lowest number(first)", optionValue: "1" },
      { optionName: "Highest number(first)", optionValue: "2" },
      { optionName: "A - Z", optionValue: "3" },
      { optionName: "Z - A", optionValue: "4" },
    ];
  };

  getFilterOptions = () => {
    const { types } = this.state;
    let allTypes = types.map(({ name }) => ({
      optionName: name,
      optionValue: name,
    }));

    allTypes = allTypes.sort(({ optionName: type1 }, { optionName: type2 }) => {
      return type1 < type2 ? -1 : type1 > type2 ? 1 : 0;
    });

    allTypes.splice(0, 0, { optionName: "All", optionValue: "All" });
    return allTypes;
  };

  renderPokemons = () => {
    let { pageSize, currentPage } = this.state;
    const { totalCount, pokemons, searchQuery } = this.getPagedData();

    return (
      <React.Fragment>
        <Header
          searchQuery={searchQuery}
          onChange={this.handleSearchByName}
          onSort={this.handleSort}
          onFilter={this.handleFiltering}
          getSortOptions={this.getSortOptions}
          getFilterOptions={this.getFilterOptions}
        />
        <div className="container">
          {pokemons.map((pokemon) => {
            const {
              _id,
              pokemonName,
              pokemonNumber,
              imageUrl,
              primaryType,
              secondaryType,
              alternateFormName,
            } = pokemon;

            return (
              <PokemonCard
                key={_id}
                pokemonId={_id}
                pokemonName={pokemonName}
                pokemonNumber={pokemonNumber}
                imageUrl={imageUrl}
                primaryType={primaryType}
                secondaryType={secondaryType}
                alternateFormName={alternateFormName}
                onClick={this.handleClick}
              />
            );
          })}
          <Pagination
            itemsCount={totalCount}
            pageSize={pageSize}
            onPageChange={this.handlePageChange}
            currentPage={currentPage}
          />
        </div>
      </React.Fragment>
    );
  };

  render() {
    return this.renderPokemons();
  }
}

export default Pokemons;
