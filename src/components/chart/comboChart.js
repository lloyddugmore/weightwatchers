import React from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
import { Line } from 'react-chartjs-2';
import faker from 'faker';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

const data = {
    labels,
    datasets: [
      {
        label: 'Daniella',
        backgroundColor: 'rgba(255, 153, 255, 1)',
        borderColor: 'rgba(255, 153, 255,1)',
        borderWidth: 2,
        data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 }))
      },
      {
        label: 'Lloyd',
        backgroundColor: 'rgba(51, 153, 255, 1)',
        borderColor: 'rgba(51, 153, 255, 1)',
        borderWidth: 2,
        data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 }))
      }
    ]
  }

  export const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom'
      },
      title: {
        display: true,
        text: 'Weight track',
      },
    },
  };


const ComboChart = (props) => {
    console.log(props.input)
    return (
        <Line
        data={data}
        options={options} />
    );
}

export { ComboChart };