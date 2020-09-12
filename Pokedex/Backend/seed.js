const { Pokemon } = require("./models/pokemons");
const { PokemonType } = require("./models/pokemonTypes");
const csv = require("csvtojson");

const pokemonTypes = [
  "Bug",
  "Dark",
  "Dragon",
  "Electric",
  "Fairy",
  "Fighting",
  "Fire",
  "Flying",
  "Ghost",
  "Grass",
  "Ground",
  "Ice",
  "Normal",
  "Poison",
  "Psychic",
  "Rock",
  "Steel",
  "Water",
];

async function saveTypes() {
  pokemonTypes.forEach((type) => {
    const pokemonType = { name: type };
    await new PokemonType(pokemonType).save();
  });
}

async function saveIt() {
  const pokemons = await csv().fromFile("../PokemonDatabaseWithoutID.csv");
  
  pokemons.forEach(async (pokemon) => {
    await new Pokemon(pokemon).save();
  });
}

saveTypes();
saveIt();
