import React, { Component } from 'react';
import Axios from 'axios';

import Hero from './Components/hero';

class App extends Component {

    constructor() {
      super();
      this.state = {
        CityNames: [],
        suggestions: [],
        searchValue: '',
        locationData: [],
      };

      this.handleGetCity = this.handleGetCity.bind(this);
       
    }

    handleGetCity(city) {
         Axios.get(`https://api.openaq.org/v1/locations`, {
           params: {
             country: 'GB',
             limit: 10000,
           },
         })
          .then((response) => {
            const cityLocation = response.data.results.map((place) => {
              return place.location;
            });

            this.setState({
              Cities: response.data.results,
              CityNames: cityLocation,
            });

            if (response.data.totalcount === 0 ) console.log('no location found');
          })
       };


    componentDidMount(){
      this.handleGetCity('Manchester');
    }
    

    onTextChanged = (event) => {
      const value = event.target.value;
      let suggestions = [];
      if (value.length > 0) {
        const regex = new RegExp(`^${value}`, 'i');
        suggestions = this.state.CityNames.sort().filter(value => regex.test(value));
      }
      this.setState({
        suggestions: suggestions,
        text: value,
      });
    };

    suggestionSelected(value) {
      this.setState({
        text: value,
        suggestions: [],
      });
      Axios.get('https://api.openaq.org/v1/latest', {
        params: {
          country: 'GB',
          location: value,
        },
      })
        .then((response) => {
          this.setState((prevState) => {
            return {
              locationData: prevState.locationData.concat(response.data.results),
              text: '',

            };
          });
        });
    }
 

  render() {
    return (
      <React.Fragment>
        <Hero onSearch={this.handleGetCity} onChange={this.onTextChanged}/>
      </React.Fragment>
    );
  }
}

export default App;
