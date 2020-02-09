import React, { Component } from 'react';

import Hero from './Components/hero';
import SearchBar from './Components/searchbar';

class App extends Component {

    constructor() {
      super();
      this.state = {
        CityNames: [],
        suggestions: [],
        searchValue: '',
        locationData: [],
      };

     ;
       
    }


  render() {
    return (
      <React.Fragment>
        <Hero/>
        <SearchBar/>
      </React.Fragment>
    );
  }
}

export default App;
