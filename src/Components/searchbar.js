import React, { Component } from 'react';
import Axios from 'axios';

class SearchBar extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            CityNames: [],
            suggestions: [],
            text: '',
            locationData: [],
        };
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(event){
        this.setState({
            searchText: event.target.value,
        });

    componentWillMount = () => {
        Axios.get('https://api.openaq.org/v1/locations', {
            params: {
                country: 'GB',
                limit: 10000,
            },
        })
        .then((response) => {
            const cityLocation = response.data.results.map((city) => {
                return city.location;
            })

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
            suggestions = this.state.CityNames.sort().filter(value => regex.test(value));
        }
        this.setState({
            suggestions: suggestions,
            text: value,
        });
    };

    selectedSuggestion(value) {
        this.setState({
            text: value,
            suggestions: [],
        });
        Axios.get(`https://api.openaq.org/v1/latest`, {
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



    }

   render () {
       return(
         <div>
             <input 
             className="search-form__input"
             type='text'
             placeholder='Enter city name...'
             onChange={this.handleInputChange}
             onKeyPress={event => {
                 if(event.key === 'Enter') {
                     this.props.onSearch(this.state.searchText)
                 }
             }}
             value={this.state.searchText}
             />
         </div>  
       )
   } 
}

export default SearchBar;