import React from 'react';
// import Axios from 'axios';

class SearchBar extends React.Component {

  constructor(props) {
    super(props);
    this.state = { searchText: '' };
    this.handleInputChange = this.handleInputChange.bind(this);
    //this.handleKeyPressed = this.handleKeyPressed.bind(this);
  }

  // handleInputChange = (event) => {

  // };

  handleInputChange(event){
    this.setState({
      searchText: event.target.value,
    });
  }

  render () {
    console.log(this.state)
    return(
      <div>
      <div>
        <input
          type='text'
          placeholder='Enter city Name...'
          onChange={this.handleInputChange}
          onKeyPress={event => {
            if(event.key === 'Enter') {
              this.props.onSearch(this.state.searchText)
            }
          }}
          //onKeyPress={this.handleKeyPressed}
          value={this.state.searchText}
          />
      </div>
          

      </div>
    )
  }
}

export default SearchBar;