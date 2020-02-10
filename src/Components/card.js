import React from 'react';

class Card extends React.Component {
    constructor(props) {
        super(props);

        this.state ()
    };

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


    render() {
        return(
            <React.Fragment>
                 <div className="Card">
                    <p><b>Values:  </b></p>{this.getValues()}
                    </div>
            </React.Fragment>
        )
    }
}

export default Card