import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import './SelectInput.css'
import { paramsChanged, requestNewData } from '../actions';


class SelectInput extends Component {

    constructor(props) {
        super(props)

        this.state = {
            value: props.defaultValue
        }
    }

    handleChange(e) {
        const value = e.target.value

        const paramName = this.props.paramName;
        const params = Object.assign(
            this.props.params, {[paramName]: value});
        paramsChanged(params);
        if (value !== '') {
            requestNewData(params);
        }

        this.setState({value})
    }

    render() {
        const { value } = this.state

        return (
            <div className="fmz-select">
                <select name="cars" value={value} onChange={this.handleChange.bind(this)}>
                    <option value="12">Monthly</option>
                    <option value="4">Quarterly</option>
                    <option value="1">Yearly</option>
                </select>
            </div>
        )
    }
}


SelectInput.propTypes = {
    defaultValue: PropTypes.number,
    paramName: PropTypes.string.isRequired,
    params: PropTypes.object.isRequired
}

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
