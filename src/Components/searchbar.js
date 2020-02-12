import React from 'react';
import Axios from 'axios';

import Card from './card';

import '../Styles/searchbox.css';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      CityNames: [],
      suggestions: [],
      text: '',
      locationData: [],
    };
  }


    UNSAFE_componentWillMount = () => {
      Axios.get('https://api.openaq.org/v1/locations', {
        params: {
          country: 'GB',
          limit: 10000,
        },
      })
        .then((response) => {
            console.log(response.data.results);
          const cityLocation = response.data.results.map((city) => {
            return city.location;
          });

          this.setState({
            Cities: response.data.results,
            CityNames: cityLocation,
          });
        });
    };

    onTextChanged = (event) => {
      const value = event.target.value;
      let suggestions = [];
      if (value.length > 0) {
        const regex = new RegExp(`^${value}`, 'i');
        suggestions = this.state.CityNames.sort().filter(v => regex.test(v));
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

      renderSuggestions() {
        const { suggestions } = this.state;
        if (suggestions.length === 0) {
          return null;
        }
        return (
          <ul className="dropdown">
            {suggestions.map((item) => 
            <li 
            key={item} 
            className="dropdownItem" 
            onKeyPress={event => {
                if(event.key === 'Enter') {
                    this.suggestionSelected(item)
                }
            }}
            onClick={() => this.suggestionSelected(item)
            }>
            {item}
            </li>)}
          </ul>
        );
      }

      deleteCard = (index) => {
        const array = [...this.state.locationData];
        array.splice(index, 1);
        return this.setState({ locationData: array});
      };

      render() {
        const { text } = this.state;
        return (
          <React.Fragment>
            <div className="AutocompleteText">
              <div>
                <input
                  className= "input"
                  type="text"
                  onChange={this.onTextChanged}
                  value={text}
                  placeholder={'Enter city name...'}
                />
                <span className="searchIcon"></span>
                {this.renderSuggestions()}
                <span/>
              </div>
            </div>
            <div className="cards">
              {this.state.locationData ? this.state.locationData.map((data, index) => {
                return (
                  <React.Fragment key={data.location}>
                   <Card
                   locationData={data}
                   values={data.measurements}
                   index={index}
                   deleteCard={this.deleteCard}
                   /> 
                  </React.Fragment>
                );
              }) : null
          }
            </div>
          </React.Fragment>
        );
      }
}
export default SearchBar;