import React, { Component } from "react";
import PokemonType from "./pokemonType";
import { pad, renderName } from "../utils/pokemonUtils";

class PokemonCard extends Component {
  render() {
    const imageSize = "160px";
    const {
      pokemonId,
      pokemonNumber,
      pokemonName,
      imageUrl,
      primaryType,
      secondaryType,
      alternateFormName,
    } = this.props;

    return (
      <div className="card pokemon-card">
        <a href={`/pokemons/${pokemonId}`}>
          <img
            style={{ width: imageSize, height: imageSize }}
            src={imageUrl}
            alt="Pokemon"
          />
        </a>
        <div className="card-body" style={{ textAlign: "left" }}>
          <div className="card-title pokemon-card-text">
            <span style={{ fontSize: "12px", color: "#777" }}>
              {pad(pokemonNumber, 3)}
            </span>{" "}
            <br />
            {renderName(pokemonName, alternateFormName)}
          </div>
        </div>
        <div className="card-footer" style={{ backgroundColor: "inherit" }}>
          <PokemonType type={primaryType} /> {"  "}
          <PokemonType type={secondaryType} />
        </div>
      </div>
    );
  }
}

export default PokemonCard;
