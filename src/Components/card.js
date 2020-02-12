import React from 'react';

import moment from 'moment';

import '../Styles/card.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons/faTimes';

class Card extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

        };
    }

    getValues = () => {
        return this.props.values.map(item => {
            const values = [];
            values.push(
                <React.Fragment 
                    key={item.parameter}>
                    <p>{item.parameter }: {item.value}, </p>
                </React.Fragment>);
        return (
            <React.Fragment key={item.parameter}>
                <b>
                    {values}  
                </b>
            </React.Fragment>
          );        
        });
    };

    getUpdate = () => {
        const times = [];
        this.props.values.map(update => {
            const localTime = moment(update.lastUpdated).format('YYYY-MM-DD:HH:mm:ss Z');
            const unix = moment(localTime).utc();
            return times.push(unix);
        });
        const smallestTime = Math.min.apply(null, times);
        const smallFormat = moment(smallestTime).format();
        const time = moment(smallFormat).fromNow().toUpperCase();
        return (
          <p>UPDATED {time}</p>
        );
    };

     deleteCard = () => {
         this.props.deleteCard(this.props.index);
     };


    render() {
        return(
            <React.Fragment>
            <div className="Card">
                <div className="close">
                    <FontAwesomeIcon onClick={this.deleteCard} icon={faTimes} />
                </div>
              {<b>{this.getUpdate()}</b>}
              <h1 className="PlaceTitle">{this.props.locationData.location}</h1>
              <p>{`in ${this.props.locationData.city}, United kingdom`}</p>
              <div className="valuesContainer">
                <p><b>Values:  </b></p>{this.getValues()}
              </div>
            </div>
          </React.Fragment>
        )
    }
}

export default Card