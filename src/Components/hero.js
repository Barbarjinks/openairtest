import React from 'react';
import SearchBar from './searchbar';

const Hero = (props) => (
    <section>
        <div>
          <h1>Compare your Air</h1>
          <h3>Compare the air quality between cities in the UK.</h3>
          <h3>Select cities to compare using the search tool below.</h3>
        <SearchBar onSearch={props.onSearch}/>

        </div>
    </section>
);

export default Hero;