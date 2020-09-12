const mongoose = require("mongoose");

const pokemonTypeSchema = new mongoose.Schema({
  name: { type: String, required: true },
});

const PokemonType = mongoose.model("PokemonType", pokemonTypeSchema);

module.exports.pokemonTypeSchema = pokemonTypeSchema;
module.exports.PokemonType = PokemonType;
