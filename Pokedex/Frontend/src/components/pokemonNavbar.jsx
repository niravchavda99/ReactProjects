import React, { Component } from "react";
import { renderName, pad } from "../utils/pokemonUtils";

class PokemonNavbar extends Component {
  getLink = (pokemon) => {
    const { onNavigate } = this.props;
    const {
      _id: id,
      pokemonName: name,
      pokemonNumber: number,
      alternateFormName: aName,
    } = pokemon;
    return (
      <a
        onClick={async (e) => await onNavigate(e, id)}
        href={`/pokemons/${id}`}
        className="pokemon-nav-link"
      >
        {`${pad(number || 0, 3)} ${renderName(name || "", aName || "")}`}
      </a>
    );
  };

  render() {
    const { previousPokemon, nextPokemon } = this.props;
    return (
      <div className="container">
        <nav className="navbar navbar-dark bg-dark">
          {this.getLink(previousPokemon)}
          {this.getLink(nextPokemon)}
        </nav>
      </div>
    );
  }
}

export default PokemonNavbar;
