import React from "react";

import moment from "moment";

import "../Styles/card.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons/faTimes";

class Card extends React.Component {
  getValues = () => {
    return this.props.values.map(item => {
      return (
        <p>
          <strong>
            {item.parameter}: {item.value},{" "}
          </strong>
        </p>
      );
    });
  };

  getLastUpdatedText = () => {
    const { values } = this.props;

    const lastUpdatedTime = values[0].lastUpdated;
    const lastUpdatedFormatted = moment(lastUpdatedTime)
      .fromNow()
      .toUpperCase();

    return <p>UPDATED {lastUpdatedFormatted}</p>;
  };

  onDeleteCard = () => {
    this.props.onDeleteCard(this.props.index);
  };

  render() {
    return (
      <div className="card">
        <div className="close">
          <FontAwesomeIcon onClick={this.onDeleteCard} icon={faTimes} />
        </div>
        <strong>{this.getLastUpdatedText()}</strong>
        <h1>{this.props.locationData.location}</h1>
        <p>{`in ${this.props.locationData.city}, United kingdom`}</p>
        <div className="values-container">
          <p>
            <b>Values: </b>
          </p>
          {this.getValues()}
        </div>
      </div>
    );
  }
}

export default Card;
