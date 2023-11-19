import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  plugins: {
    legend: {
      display: false,
      labels: {
        // This more specific font property overrides the global property
        font: {
          size: 20,
        },
      },
    },
    tooltip: {
      titleFont: {
        size: 18,
      },
      bodyFont: {
        size: 18,
      },
      footerFont: {
        // size: 10, // there is no footer by default
      },
      callbacks: {
        label: (item) => {
          const count = item.dataset.data[item.dataIndex];
          const info = `${(count).toFixed(5)} gCO2e`;
          return info;
        },
      },
    },
  },
  responsive: true,
  maintainAspectRatio: false,
}

//const labels = [ 'Sweden', 'Switzerland', 'France', 'Your algorithm', 'Canada', 'United Kingdom', 'USA', 'China', 'India', 'Austra'];





export function BarChart(props) {
  const match = [['Sweden', 13], ['Switzerland', 26],['France', 117],['Canada', 274], ['United Kingdom', 527], ['USA', 967], ['China', 1226], ['India', 1616], ['Austra', 1916], ['Your Algorithm', props.footprint]]
  // Separate the first elements into a new array
  // 배열을 두 번째 요소를 기준으로 오름차순 정렬
  const sortedMatch = match.slice().sort((a, b) => a[1] - b[1]);


  const labels = sortedMatch.map(item => item[0]);

  // Separate the second elements into a new array
  const datas = sortedMatch.map(item => item[1]);

  const yourAlgorithmIndex = sortedMatch.findIndex(item => item[0] === 'Your Algorithm');
  const borderWidthArray = Array.from({ length: sortedMatch.length }, (_, index) => (index === yourAlgorithmIndex ? 4 : 0));
  //const borderColorrray = Array.from({ length: sortedMatch.length }, (_, index) => (index === yourAlgorithmIndex ? 'rgba(0,0,0,1)' : 0));


  const data = {
    labels,
    datasets: [
      {
       
        data: datas,
        backgroundColor: ['rgba(232, 255, 241, 1)',
                          'rgba(124, 240, 167, 1)',
                          'rgba(142, 255, 154, 1)',
                          'rgba(141, 229, 120, 1)',
                          'rgba(148, 209, 79, 1)',
                          'rgba(187, 209, 79, 1)',
                          'rgba(172, 196, 52, 1)',
                          'rgba(196, 167, 52, 1)',
                          'rgba(215, 156, 18, 1)',
                          'rgba(229, 40, 11, 1)',
                        ],
                        borderColor: 'rgba(0,0,0,1)', // 바의 테두리 색상
                        borderWidth: borderWidthArray, // 테두리 두께
      },
      
    ],
  };

  return <Bar options={options} data={data} />;
}