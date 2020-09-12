const express = require("express");
const { PokemonType } = require("../models/pokemonTypes");
const router = express.Router();

router.get("/", async (req, res) => {
  const types = await PokemonType.find();
  res.send(types);
});

router.get("/:id", async (req, res) => {
  const type = await PokemonType.findById(req.params.id);
  res.send(type);
});

module.exports = router;
