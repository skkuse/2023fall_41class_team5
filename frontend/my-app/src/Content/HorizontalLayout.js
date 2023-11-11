import React, { useState }  from 'react';
import GridLayout from './GridLayout';
import Details from './Details';

function HorizontalLayout(props){
    // props.data

    const [data, setData] = useState({memory : 53.124, cpu : 200.657 , details : ["12H 00M", "CPU", "12", "Xeon E5-2683 v4", "64G", "Local Server", "Austria", "NO", "NO", "NO"]});
    
    return (
      <div className='horizontalLayout' style={{ display: 'flex'}}>
        <div className='details' style={{ flex: 1 }}><Details data = {data.details}></Details></div>
        <div style={{ flex: 2}}><GridLayout memory = {data.memory} cpu = {data.cpu}></GridLayout></div>
      </div>
    );
  }

export default HorizontalLayout;