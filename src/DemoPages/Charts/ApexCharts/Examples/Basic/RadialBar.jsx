import React, { Component } from 'react';
import Chart from 'react-apexcharts'

class RadialBar extends Component {

  constructor(props) {
    super(props);

    this.state = {
      options: {
        labels: ['RadialBar'],
        plotOptions: {
          radialBar: {
              hollow: {
                  size: '70%',
              }
          },
        },
      },
      series: [12],
    }
  }

  render() {

    return (
      <div className="radialbar">
        <Chart options={this.state.options} series={this.state.series} type="radialBar" height="380" />
      </div>
    );
  }
}

export default RadialBar;
