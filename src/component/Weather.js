import React, { Component } from 'react';

class Weather extends Component {
    render() {
        return (
            <div>
                <p>Date :{this.props.weatherDataResult.date} </p>
                <p>description:{this.props.weatherDataResult.description} </p>
            </div>
        )
    }
}

export default Weather