const express = require("express");
const pokemonTypes = require("../routes/pokemonTypes");
const pokemons = require("../routes/pokemons");

module.exports = function (app) {
  app.use(express.json());
  app.use("/api/types", pokemonTypes);
  app.use("/api/pokemons", pokemons);
};
