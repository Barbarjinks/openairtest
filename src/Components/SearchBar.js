import React from "react";
import Axios from "axios";

import Card from "./Card";

import "../Styles/search-bar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

class SearchBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      cityNames: [],
      suggestions: [],
      text: "",
      locationData: []
    };
  }

  componentDidMount() {
    Axios.get("https://api.openaq.org/v1/locations", {
      params: {
        country: "GB",
        limit: 10000
      }
    }).then(response => {
      const cityLocation = response.data.results.map(city => {
        return city.location;
      });

      this.setState({
        cities: response.data.results,
        cityNames: cityLocation
      });
    });
  }

  onTextChanged = event => {
    const value = event.target.value;
    let suggestions = [];
    if (value.length > 0) {
      const regex = new RegExp(`^${value}`, "i");
      suggestions = this.state.cityNames.sort().filter(v => regex.test(v));
    }
    this.setState({
      suggestions: suggestions,
      text: value
    });
  };

  suggestionSelected = value => {
    this.setState({
      text: value,
      suggestions: []
    });
    Axios.get("https://api.openaq.org/v1/latest", {
      params: {
        country: "GB",
        location: value
      }
    }).then(response => {
      this.setState(prevState => {
        return {
          locationData: prevState.locationData.concat(response.data.results),
          text: ""
        };
      });
    });
  };

  renderSuggestions = () => {
    const { suggestions } = this.state;
    if (suggestions.length === 0) {
      return null;
    }
    return (
      <ul className="dropdown">
        {suggestions.map(item => (
          <li
            key={item}
            onKeyPress={event => {
              if (event.key === "Enter") {
                this.suggestionSelected(item);
              }
            }}
            onClick={() => this.suggestionSelected(item)}
          >
            {item}
          </li>
        ))}
      </ul>
    );
  };

  handleDeleteCard = cardIndex => {
    const { locationData } = this.state;

    const newLocationData = locationData.filter(
      (location, locationIndex) => locationIndex !== cardIndex
    );
    return this.setState({ locationData: newLocationData });
  };

  render() {
    const { text } = this.state;
    return (
      <React.Fragment>
        <div className="autocomplete-text">
          <div className="search-field">
            <FontAwesomeIcon icon={faSearch} className="search-icon" />
            <input
              className="input"
              type="text"
              onChange={this.onTextChanged}
              value={text}
              placeholder={"Enter city name..."}
            />
            <span className="searchIcon"></span>
            {this.renderSuggestions()}
            <span />
          </div>
        </div>
        <div className="cards-wrapper">
          {this.state.locationData
            ? this.state.locationData.map((data, index) => {
                return (
                  <React.Fragment key={data.location}>
                    <Card
                      locationData={data}
                      values={data.measurements}
                      index={index}
                      onDeleteCard={this.handleDeleteCard}
                    />
                  </React.Fragment>
                );
              })
            : null}
        </div>
      </React.Fragment>
    );
  }
}
export default SearchBar;
