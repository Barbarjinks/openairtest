import React, { Component } from "react";

import Hero from "./Components/hero";
import SearchBar from "./Components/searchbar";

import "./Styles/app.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      CityNames: [],
      suggestions: [],
      text: "",
      locationData: []
    };
  }

  render() {
    return (
      <div className="display">
        <Hero />
        <SearchBar />
      </div>
    );
  }
}

export default App;
