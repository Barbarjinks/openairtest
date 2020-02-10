import React, { Component } from 'react';

import Hero from './Components/hero';
import SearchBar from './Components/searchbar';
import Card from './Components/card';

import './Styles/app.css'

class App extends Component {

  constructor() 
  {super()
    this.state = {
      CityNames: [],
      suggestions: [],
      text: '',
      locationData: [], 
    }
  }


  render() {
    return (
      <React.Fragment>
        <Hero/>
        <SearchBar/>
        <Card/>
      </React.Fragment>
    );
  }
}

export default App;
