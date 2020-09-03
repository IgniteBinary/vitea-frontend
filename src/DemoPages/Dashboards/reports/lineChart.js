import React from 'react';
import { Line } from 'react-chartjs-2';



const options = {
    scales: {
        xAxes: [{
            gridLines: {
                drawOnChartArea: false
            }
        }],
        yAxes: [{
            gridLines: {
                drawOnChartArea: false
            }
        }]
    },
    legend: {
            display: false
         },
         tooltips: {
            enabled: false
         }
}


class LineChart extends React.Component {
  render() {
    return (
      <div>
        <Line data={this.props.data} options={options}/>
      </div>
    );
  }
}

export default LineChart;
