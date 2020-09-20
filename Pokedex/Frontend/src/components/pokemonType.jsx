import React from "react";
import { getTypeColor } from "../utils/pokemonUtils";

const PokemonType = ({ type, size }) => {
  if (type) {
    const { color: typeColor, textColor } = getTypeColor(type);
    const fontSize = size || "12px";
    return (
      <div
        className="badge type-badge"
        style={{
          color: textColor,
          fontSize,
          fontWeight: "normal",
          backgroundColor: typeColor,
          border: `1px solid ${typeColor}`,
        }}
      >
        {type}
      </div>
    );
  }
  return null;
};

export default PokemonType;
