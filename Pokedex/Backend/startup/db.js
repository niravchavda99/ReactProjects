const mongoose = require("mongoose");
const config = require("config");

module.exports = function () {
  let db = config.get("db");
  db =
    "mongodb+srv://pokedex_user:pokedexPASSWORD@cluster0.1kcru.mongodb.net/pokedex?retryWrites=true&w=majority";
  mongoose
    .connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    })
    .then(() => console.info(`Connected to ${db}...`));
};
