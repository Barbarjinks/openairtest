import React, { Component } from "react";

import Hero from "./Components/Hero";
import SearchBar from "./Components/SearchBar";

import "./Styles/app.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      cityNames: [],
      suggestions: [],
      text: "",
      locationData: []
    };
  }

  render() {
    return (
      <div className="container">
        <Hero />
        <SearchBar />
      </div>
    );
  }
}

export default App;
