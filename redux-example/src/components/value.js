import React, { Component } from 'react';
import PropTypes from 'prop-types';

const propTypes ={
    number : PropTypes.number
};

const defaultProps={
    number: -1
};

class value extends Component {

    render() {
        return (
            <div>
               <h1>{this.props.number}</h1>
            </div>
        );
    }
}

value.propTypes = propTypes;
value.defaultProps = defaultProps;
export default value;