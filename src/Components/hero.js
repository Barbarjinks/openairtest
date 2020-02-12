import React from "react";

import "../Styles/hero.css";

const Hero = props => (
  <header className="heading">
    <h1 className="heading-title">Compare your Air</h1>
    <p className="heading-copy">
      Compare the air quality between cities in the UK.
    </p>
    <p className="heading-copy">
      Select cities to compare using the search tool below.
    </p>
  </header>
);

export default Hero;
