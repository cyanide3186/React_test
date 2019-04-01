import React, { Component } from 'react';
import PropTypes from 'prop-types';

const propTypes={
    onPlus: PropTypes.func,
    onSubtract : PropTypes.func,
    onRandomizeColor : PropTypes.func
};

function createWarning(funcName){
    return()=> console.warn(funcName+'is NOT defined')
}
const defaultProps={
    onPlus: createWarning('onPlus'),
    onSubtract: createWarning('onSubtract'),
    onRandomizeColor: createWarning('onRandomizeColor')
 
}
class control extends Component {

    render() {
        return (
            <div>
                <button onClick={this.props.onPlus}>+</button>
                <button onClick={this.props.onSubtract}>-</button>
                <button onClick={this.props.onRandomizeColor}>Randomize Color</button>
            </div>
        );
    }
}

control.propTypes = propTypes;
control.defaultProps=defaultProps;

export default control;