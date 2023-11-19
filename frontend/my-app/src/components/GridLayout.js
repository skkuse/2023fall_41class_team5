import React, { useState } from 'react';
import DoughnutChart from './DoughnutChart';
import { BarChart } from './BarChart';


function GridItemA(props){
    const unit_list = ["tree-months", "km", "%"]
    const text_list = ["Carbon sequestration", "in a passenger car", "of a flight Paris-London"]
    const img_list = ["logo_tree.svg", "logo_car.svg", "logo_plane.svg"]
    
    let mode
    let unit = props.result
    switch(props.area){
        case 'a' : 
            // 48 pond per year
            //unit = props.treeMonths//((props.result)/ 1000) / (21.7724 / 12)
            mode = 0
            break
        case 'b' :
            // 114.1g CO2/km 
            //unit = props.driving// (props.result)/ 114.1
            mode = 1
            break
        case 'c' :
            // From Paris to London : 1h 15m (312.5kg) , 1h => Co2 250kg 
            //unit = props.flight//(((props.result) / 1000) / 312.5) * 100
            mode = 2
            
    }

    return <div className="grid-item grid-itemA" style={{gridArea:  props.area}}>
       <img src={process.env.PUBLIC_URL + '/img/' + img_list[mode]}></img>
       <h3>{unit.toFixed(2)} {unit_list[mode]}</h3>
       <p>{text_list[mode]}</p>
    </div>
}

function GridItemB(props){
    const unit_list = ["g CO2", "kWh"]
    const text_list = ["Carbon footprint", "Energy needed"]
    const img_list = ["logo_co2.svg", "logo_power.svg"]
    
    let mode
    let unit = props.result
    switch(props.area){
        case 'd' : 
            //unit = props.gCo2//props.result
            mode = 0
            break
        case 'e' :
            // 2022 South Korea 435.69 g CO2e/kWh
            //unit = (props.result) / 435.69
            mode = 1
            break
            
    }


    return <div className="grid-item grid-itemB" style={{gridArea:  props.area}}>
        <img src={process.env.PUBLIC_URL + '/img/' + img_list[mode]}></img>
        <div>
            <h3>{unit.toFixed(2)} {unit_list[mode]}</h3>
            <p>{text_list[mode]}</p>
       </div>
    </div>
}

// const donutData = [
//     {name: "Memory", value: 19},
//     {name: "CPU", value: 20},
// ]



function GridItemC(props){
    // const [cpu, setCpu] = useState(2320)
    // const [memory, setMemoty] = useState(1242)
    // const [footprint, setFootprint] = useState(1000)
    const cpu = (props.cpu).toFixed(0)
    const memory = (props.memory).toFixed(0)
    const footprint = (props.co2).toFixed(0)

    return <div className="grid-item grid-itemC" style={{gridArea:  props.area }}>
        <h3>Computing cores VS Memory</h3>
        <div className="chart-container"><DoughnutChart cpu = {cpu} memory = {memory}/></div>
        
        <h3 style={{paddingTop:"50px"}}>How the location impacts your footprint</h3>
        <div className="chart-container" style={{width: "400px"}}> <BarChart footprint={footprint}></BarChart> </div>
    </div>
}

function GridLayout(props){
    // const memory = props.memory
    // const cpu = props.cpu
    // const co2 = memory + cpu // unit gCo2

    return (
      <div className="grid-container">
        <GridItemA area='a' result={props.treeMonths}></GridItemA>
        <GridItemA area='b' result={props.driving}></GridItemA>
        <GridItemA area='c' result={props.flight}></GridItemA>
        <GridItemB area='d' result={props.gCo2}></GridItemB>
        <GridItemB area='e' result={props.kWh}></GridItemB>
        <GridItemC memory={props.memCo2} cpu={props.cpuCo2} co2={props.gCo2} area='f' ></GridItemC>
        
      </div>
    );
  }

export default GridLayout;