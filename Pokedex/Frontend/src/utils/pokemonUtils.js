function pad(num, size = 2) {
  let str = num + "";
  while (str.length < size) str = "0" + str;
  return "#" + str.substr(0, size);
}

function renderName(pokemonName, alternateFormName) {
  let name = pokemonName;
  if (alternateFormName) {
    if (
      alternateFormName.startsWith("Mega") ||
      alternateFormName.startsWith("Gigantamax")
    )
      name = alternateFormName + " " + name;
    else {
      name += "(" + alternateFormName + ")";
    }
  }
  return name;
}

function getTypeColor(type) {
  const typeColors = [
    { type: "Bug", color: "#A8B820", textColor: "white" },
    { type: "Dark", color: "#705848", textColor: "white" },
    { type: "Dragon", color: "#7038F8", textColor: "white" },
    { type: "Electric", color: "#F8D030", textColor: "black" },
    { type: "Fairy", color: "#EE99AC", textColor: "black" },
    { type: "Fighting", color: "#C03028", textColor: "white" },
    { type: "Fire", color: "#F08030", textColor: "white" },
    { type: "Flying", color: "#A890F0", textColor: "black" },
    { type: "Ghost", color: "#493963", textColor: "white" },
    { type: "Grass", color: "#78C850", textColor: "black" },
    { type: "Ground", color: "#E0C068", textColor: "black" },
    { type: "Ice", color: "#98D8D8", textColor: "black" },
    { type: "Normal", color: "#A8A878", textColor: "black" },
    { type: "Poison", color: "#A040A0", textColor: "white" },
    { type: "Psychic", color: "#F85888", textColor: "white" },
    { type: "Rock", color: "#B8A038", textColor: "white" },
    { type: "Steel", color: "#B8B8D0", textColor: "black" },
    { type: "Water", color: "#6890F0", textColor: "white" },
    { type: "Unknown", color: "#68A090", textColor: "white" },
  ];

  const { color, textColor } = typeColors.find(
    (typeColor) => typeColor.type === type
  );
  return { color, textColor };
}

module.exports = { pad, renderName, getTypeColor };
