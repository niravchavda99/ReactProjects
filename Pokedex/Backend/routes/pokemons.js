const express = require("express");
const { PokemonType } = require("../models/pokemonTypes");
const { Pokemon } = require("../models/pokemons");
const router = express.Router();

router.get("/type/:id", async (req, res) => {
  console.log("ID: ", req.params.id);
  if (!req.params.id) return res.status(404).send("Page not found!");

  const type = await PokemonType.findById(req.params.id);
  if (!type) return res.status(404).send("Type not found!");

  let primaryPokemons = await Pokemon.find({ primaryType: type.name });
  let secondaryPokemons = await Pokemon.find({ secondaryType: type.name });
  const pokemons = [...primaryPokemons, ...secondaryPokemons];

  res.send(pokemons);
});

router.get("/", async (req, res) => {
  const pokemons = await Pokemon.find();
  res.send(pokemons);
});

router.get("/:id", async (req, res) => {
  const pokemon = await Pokemon.findById(req.params.id);
  res.send(pokemon);
});

module.exports = router;
