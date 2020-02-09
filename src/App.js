import React, { Component } from 'react';
import Home from './Components/Home';
import SearchBar from './Components/searchbar';

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Home/>
        <SearchBar/>
      </React.Fragment>
    );
  }
}

export default App;
