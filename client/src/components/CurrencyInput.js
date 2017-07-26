import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './CurrencyInput.css';
import { paramsChanged, requestNewData } from '../actions';

class CurrencyInput extends Component {
	constructor(props) {
		super(props)

		this.state = {
			hasFocus: false,
			value: props.defaultValue
		}
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

	handleFocus(e) {
		this.setState({
			hasFocus: true
		})
	}

	render() {
		const { defaultValue } = this.props
		const { value } = this.state

		return (
			<div className={`currency-input ${defaultValue !== undefined ? 'default-value' : ''}`}>
				<span>£</span>
				<input type="text"
					value={value}
					onChange={this.handleChange.bind(this)}
					onFocus={this.handleFocus.bind(this)}/>
			</div>
		)
	}
}


CurrencyInput.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(CurrencyInput);
