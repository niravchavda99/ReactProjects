const mongoose = require("mongoose");

module.exports = function () {
  const db = "mongodb://localhost/pokedex";

  mongoose
    .connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    })
    .then(() => console.info(`Connected to ${db}...`));
};
