import React from "react";

const PokemonLogo = () => {
  return (
    <div className="container logo-container">
      <img
        className="pokemon-logo"
        src={require("../pokemon_logo.png")}
        alt="Pokemon"
      />
    </div>
  );
};

export default PokemonLogo;
