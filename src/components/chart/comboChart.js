import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../store/actions/index'
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

  const options = {
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

  const dynamicColors = function() {
    var r = Math.floor(Math.random() * 255);
    var g = Math.floor(Math.random() * 255);
    var b = Math.floor(Math.random() * 255);
    return "rgb(" + r + "," + g + "," + b + ")";
 };

const ComboChart = (props) => {

  const dispatch = useDispatch();
  const onInitWeight = useCallback(() => dispatch(actions.initWeights()), [dispatch]);

  useEffect(() => {
      onInitWeight()
  },[onInitWeight]);

  const weights = useSelector(state => state.weightWatcher.weights);

  console.log(weights);

  let dateList = [];
  let dataSets = [];
  if(weights) {
    weights.forEach(element => {
      console.log(element);
      if (element.readings) {
        let resultList = [];
        element.readings.forEach(reading => {
            dateList.push(reading.entry);
            resultList.push(reading.reading);
            const color = dynamicColors();
            const actualObj = {
              backgroundColor: color,
              borderColor: color,
              borderWidth: 2,
              data: resultList,
              label: element.user
            }
            dataSets.push(actualObj);
          }
        )
      }
    });
  }

  const data2 = {
    labels: dateList,
    datasets: dataSets
  }


  console.log(data);
  console.log(data2);

  return (
    <>
      <Line
        data={data}
        options={options} />

      <p></p>

      <Line
        data={data2}
        options={options} />
  </>
  );
}

export { ComboChart };