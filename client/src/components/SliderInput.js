import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './SliderInput.css';
import { paramsChanged, requestNewData } from '../actions';


class SliderInput extends Component {

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

		return (
			<div className="fmz-slider">
				<p>{value}%</p>
				<input
					type="range"
					value={value}
					min={0}
					max={10}
					step={0.25}
					onChange={this.handleChange.bind(this)}
				/>
			</div>
		);
	}
}


SliderInput.propTypes = {
	defaultValue: PropTypes.number,
	paramName: PropTypes.string.isRequired,
	params: PropTypes.object.isRequired,
	paramsChanged: PropTypes.func.isRequired,
	requestNewData: PropTypes.func.isRequired
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

export default connect(mapStateToProps, mapDispatchToProps)(SliderInput);
