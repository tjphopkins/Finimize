import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './SelectInput.css';
import { paramsChanged, requestNewData } from '../actions';


class SelectInput extends Component {

    constructor(props) {
        super(props);

        this.state = {
            value: props.defaultValue
        };
    }

    handleChange(e) {
        const value = e.target.value;

        const paramName = this.props.paramName;
        const params = Object.assign(
            this.props.params, {[paramName]: value});
        this.props.paramsChanged(params);
        if (value !== '') {
            this.props.requestNewData(params);
        }

        this.setState({value});
    }

    render() {
        const { value } = this.state;

        const options = [];
        for (let option of this.props.options) {
            options.push(<option value={option.value}>{option.label}</option>);
        }

        return (
            <div className="fmz-select">
                <select name="cars" value={value} onChange={this.handleChange.bind(this)}>
                    {options}
                </select>
            </div>
        );
    }
}


SelectInput.propTypes = {
    defaultValue: PropTypes.number,
    paramName: PropTypes.string.isRequired,
    options: PropTypes.array.isRequired,
    params: PropTypes.object.isRequired,
    requestNewData: PropTypes.func.isRequired,
    paramsChanged: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
    return {
        params: state.params,
    };
};


const mapDispatchToProps = {
    paramsChanged,
    requestNewData
};

export default connect(mapStateToProps, mapDispatchToProps)(SelectInput);
