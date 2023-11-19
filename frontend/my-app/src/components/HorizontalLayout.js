import React, { useState }  from 'react';
import GridLayout from './GridLayout';
import Details from './Details';

  

function HorizontalLayout(props){
    // props.data

    //const [data, setData] = useState(testData);
    const {data, setData} = props;
    

    return (
      <div className='horizontalLayout' style={{ display: 'flex'}}>
        <div className='details' style={{ flex: 1 }}><Details data = {data} setData={setData}></Details></div>
        <div style={{ flex: 2}}><GridLayout kWh = {data.kWh} gCo2 = {data.gCo2} treeMonths = {data.treeMonths} driving = {data.driving} flight = {data.flight}></GridLayout></div>
      </div>
    );
  }

export default HorizontalLayout;