import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { React, Component, memo } from 'react';
import { Doughnut } from 'react-chartjs-2';


ChartJS.register(ArcElement, Tooltip, Legend);



class DoughnutChart extends Component {
  constructor(props) {
    super(props);
    // props로 받은 데이터를 state에 저장
    this.state = {
      cpu: props.cpu || 0, // 기본값 0
      memory: props.memory || 0, // 기본값 0
    };

    
    // 숫자를 담은 state를 초기화
    this.state = {
      memory: this.state.memory, // 예시로 12으로 초기화
      cpu: this.state.cpu, // 예시로 12으로 초기화
    };

    this.data = {
      labels: ['Memory', 'CPU'],
      datasets: [
        {
          data: [this.state.memory, this.state.cpu],
          backgroundColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
          ],
          borderWidth: 1,
        },
      ],
    };

    this.options = {
      plugins: {
        legend: {
          display: false,
          labels: {
            font: {
              size: 18,
            },
          },
        },
        tooltip: {
          titleFont: {
            size: 20,
          },
          bodyFont: {
            size: 20,
          },
          footerFont: {},
          callbacks: {
            label: (item) => {
              const count = item.dataset.data[item.dataIndex];
              const info = `${count} gCO2e`;
              return info;
            },
          },
        },
      },
      maintainAspectRatio: false,
    };
  }

  render() {
    return <Doughnut options={this.options} data={this.data} />;
  }
}

export default DoughnutChart;

// import React , { Component} from 'react';
// import * as d3 from 'd3';
// const colors = [ '#8ce8ad', '#57e188', '#34c768', '#2db757', '#27acaa', '#42c9c2', '#60e6e1', '#93f0e6', '#87d3f2', '#4ebeeb', '#35a4e8', '#188ce5', '#542ea5', '#724bc3', '#9c82d4', '#c981b2', '#b14891', '#ff6d00', '#ff810a', '#ff9831', '#ffb46a', '#ff9a91', '#ff736a', '#f95d54', '#ff4136', '#c4c4cd' ];

// class DoughnutChart extends Component {

//     constructor(props) {
//         super(props);
//         this.chRef = React.createRef();
//     }


//     // Chart load after component Mount
//     componentDidMount() {
//         this.drawChart()
//     }


//     // DrawChart 
//     drawChart(){
//         const {data } = this.props;
//         const svgContainer = d3.select(this.chRef.current).node();
//         const width  = svgContainer.getBoundingClientRect().width;
//         const height = width;
//         const margin = 15;
//         let radius = Math.min(width, height) / 2  - margin;
//         // legend Position
//         let legendPosition = d3.arc().innerRadius(radius/1.75).outerRadius(radius);

//         // Create SVG
//         const svg  = d3.select(this.chRef.current)
//         .append('svg')
//         .attr("width", '100%')
//         .attr("height", '100%')
//             .attr('viewBox', '0 0 ' + width + ' ' + width )
//         //.attr('preserveAspectRatio','xMinYMin')
//         .append("g")
//         .attr("transform", "translate(" + Math.min(width,height) / 2 + "," + Math.min(width,height) / 2 + ")");

//         let pie = d3.pie()
//             .value( d => d.value )
//         let data_ready = pie(data)

//         // Donut partition  
//         svg
//         .selectAll('whatever')
//         .data(data_ready)
//         .enter()
//         .append('path')
//         .attr('d', d3.arc()
//             .innerRadius(radius/ 1.75)  // This is the size of the donut hole
//             .outerRadius(radius)
//         )
//         .attr('fill',  (d) =>  colors[d.index] )
//         .attr("stroke", "#fff")
//         .style("stroke-width", "2")
//         .style("opacity", "0.8")


//       // Legend group and legend name 
//        svg
//         .selectAll('mySlices')
//         .data(data_ready)
//         .enter()
//         .append('g')
//         .attr("transform", d => `translate(${legendPosition.centroid(d)})`)
//         .attr("class", 'legend-g')
//         .style("user-select", "none")
//         .append('text')
//         .text(d =>  d.data.name)
//         .style("text-anchor", "middle")
//         .style("font-weight", 700)
//         .style("fill", '#222')
//         .style("font-size", 14);

//        //Label for value
//         svg
//         .selectAll('.legend-g')
//         .append('text')
//         .text((d)=>{ return  d.data.value})
//         .style("fill", '#444')
//         .style("font-size", 12)
//         .style("text-anchor", "middle")
//         .attr("y", 16 );
//     }



//     render() {
//         return <>
//             <div ref={this.chRef}></div> </>
//     }


// }

// export default DoughnutChart;