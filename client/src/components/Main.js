import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import CurrencyInput from './CurrencyInput'
import SliderInput from './SliderInput'
import SelectInput from './SelectInput'
import DisplayGraph from './DisplayGraph'
import '../App.css';


class Main extends Component {

    render() {
        return (
            <div className="App">
                <div className="header-banner">
                    <h1 className="fmz-white-font">Finimize Interest Rate Calculator</h1>
                </div>
                <div className="financial-inputs">
                    <p className="input-label">How much have you saved?</p>
                    <CurrencyInput paramName='initialBalance' defaultValue={0}/>

                    <p className="input-label">How much will you save each month?</p>
                    <CurrencyInput paramName='monthlyDeposit' defaultValue={0}/>

                    <p className="input-label">How much interest will you earn per year?</p>
                    <SliderInput paramName='annualInterest' defaultValue={4}/>

                    <p className="input-label">How frequently will the interest be paid?</p>
                    <SelectInput paramName='periodsPerYear' defaultValue={12}/>
                </div>
                <div className="financial-display">
                    <DisplayGraph data={this.props.data}/>
                </div>
            </div>
        );
    }
}

Main.propTypes = {
    // coming from react-redux.connect()
    data: PropTypes.array.isRequired,
};


const mapStateToProps = (state) => {
    return {
        data: state.data,
    };
};


export default connect(mapStateToProps)(Main);
