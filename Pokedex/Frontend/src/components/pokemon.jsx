import React, { Component } from "react";
import { pad, renderName } from "../utils/pokemonUtils";
import PokemonNavbar from "./pokemonNavbar";
import PokemonType from "./pokemonType";
import axios from "axios";

class Pokemon extends Component {
  state = {
    pokemon: {},
    previousPokemon: {},
    nextPokemon: {},
  };

  async componentDidMount() {
    this.setState({ id: this.props.match.params.id });
    await this.updateData();
  }

  populatePreviousAndNext = async () => {
    const id = this.props.match.params.id;
    const apiEndPoint = "https://pokedex-backend99.herokuapp.com/api";
    const {
      data: { previous: previousPokemon, next: nextPokemon },
    } = await axios.get(`${apiEndPoint}/pokemons/bounds/${id}`);
    this.setState({ previousPokemon, nextPokemon });
  };

  updateData = async () => {
    await this.populatePreviousAndNext();
    await this.loadPokemon();
  };

  loadPokemon = async () => {
    const id = this.props.match.params.id;
    const apiEndPoint = "https://pokedex-backend99.herokuapp.com/api";
    const { data: pokemon } = await axios.get(`${apiEndPoint}/pokemons/${id}`);
    this.setState({ pokemon });
  };

  render() {
    const { previousPokemon, nextPokemon, pokemon } = this.state;
    const {
      pokemonNumber,
      pokemonName,
      alternateFormName,
      imageUrl,
      primaryType,
      secondaryType,
      primaryAbility,
      secondaryAbility,
      hiddenAbility,
      specialEventAbility,
    } = pokemon;
    return (
      <React.Fragment>
        <PokemonNavbar
          previousPokemon={previousPokemon}
          nextPokemon={nextPokemon}
        />
        <div className="container">
          <a
            href="/pokemons"
            className="btn btn-primary btn-sm"
            style={{ marginTop: "10px" }}
          >
            ← All Pokemons
          </a>
          <h2
            style={{
              textAlign: "center",
              marginTop: "10px",
              marginBottom: "15px",
            }}
          >
            {renderName(pokemonName || "", alternateFormName || "")}
            {"  "}
            {pad(pokemonNumber || 0, 3)}
          </h2>
          <div className="row">
            <div className="col-md-5 col-sm-12">
              <img
                className="pokemon-image"
                src={imageUrl}
                alt={pokemonName || ""}
              />
            </div>
            <div className="col-md-4 col-sm-12">
              <h4>Pokédex data</h4>
              <hr />
              <div className="row">
                <div className="col-sm-4">National Number</div>
                <div className="col-sm-8">{pad(pokemonNumber || 0, 3)}</div>
              </div>
              <hr />
              <div className="row">
                <div className="col-sm-4">Type</div>
                <div className="col-sm-8">
                  <PokemonType size={"15px"} type={primaryType} /> {"  "}
                  <PokemonType size={"15px"} type={secondaryType} />
                </div>
              </div>
              <hr />
              <div className="row">
                <div className="col-sm-4">Species</div>
                <div className="col-sm-8">{pokemon.classification}</div>
              </div>
              <hr />
              <div className="row">
                <div className="col-sm-4">Height</div>
                <div className="col-sm-8">{`${
                  pokemon.pokemonHeight || 0
                }m`}</div>
              </div>
              <hr />
              <div className="row">
                <div className="col-sm-4">Weight</div>
                <div className="col-sm-8">{`${
                  pokemon.pokemonWeight || 0
                }kg`}</div>
              </div>
              <hr />
              <div className="row">
                <div className="col-sm-4">Abilities</div>
                <div className="col-sm-8">
                  1. {primaryAbility} <br />
                  {secondaryAbility && `2. ${secondaryAbility}`} <br />
                  {hiddenAbility && <span>{hiddenAbility} (Hidden)</span>}
                </div>
              </div>
              <hr />
              <hr />
              <hr />
            </div>
            <div className="col-md-3 col-sm-12">
              <h4>Training</h4>
              <hr />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Pokemon;
