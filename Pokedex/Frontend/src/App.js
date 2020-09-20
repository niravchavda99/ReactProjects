import React, { Component } from "react";
import Pokemons from "./components/pokemons";
import Pokemon from "./components/pokemon";
import NotFound from "./components/notFound";
import PokemonLogo from "./components/pokemonLogo";
import { Route, Switch, Redirect } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <PokemonLogo />
        <Switch>
          <Route path="/pokemons/:id" component={Pokemon} />
          <Route path="/pokemons" exact component={Pokemons} />
          <Route path="/not-found" component={NotFound} />
          <Redirect from="/" exact to="/pokemons" />
          <Redirect to="/not-found" />
        </Switch>
      </React.Fragment>
    );
  }
}

export default App;
