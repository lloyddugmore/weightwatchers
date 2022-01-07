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

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

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

  const dateMap = new Map();
  let dataSets = [];
  if(weights && weights.length > 0) {
    weights.forEach(weight => {
      if (weight.readings) {
        let resultList = [];
        let actualObj = {};
        weight.readings.forEach(reading => {
            dateMap.set(reading.entry, reading.entry);
            resultList.push(reading.reading);
            const color = dynamicColors();
            actualObj = {
              backgroundColor: color,
              borderColor: color,
              borderWidth: 2,
              data: resultList,
              label: weight.user
            }
          }
        )
        if (actualObj) {
          dataSets.push(actualObj);
        }
      }
    });
  }

  const data2 = {
    labels: [...dateMap.values()],
    datasets: dataSets
  }

  return (
    <>
      <Line
        data={data2}
        options={options} />
  </>
  );
}

export { ComboChart };