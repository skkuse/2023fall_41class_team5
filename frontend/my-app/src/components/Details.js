import React, { useState } from 'react';

function secondsToHHMM(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
  
    const hoursString = hours < 10 ? `0${hours}` : `${hours}`;
    const minutesString = minutes < 10 ? `0${minutes}` : `${minutes}`;
  
    return `${hoursString}H ${minutesString}M`;
  }


function Details(props){
    
    const {data, setData} = props
    const baseDetail = data; //useState(["12H 00M", "CPU", "12", "Xeon E5-2683 v4", "64G", "Local Server", "Austria", "NO", "NO", "NO"]);

    const handleResetClick = () => {
        const isConfirmed = window.confirm('정말로 리셋하시겠습니까?');

        if (isConfirmed) {
            // 여기에 리셋 로직을 추가하세요
            // 예: resetFunction();
            setData(prevData => {
                // 이전 상태를 기반으로 새로운 상태를 만듭니다.
                return {
                  ...prevData,
                  details: baseDetail,
                };
              });
            console.log('Reset confirmed!');
        } else {
            console.log('Reset canceled.');
        }
    }

    if(data.executionTime < 0){
        // error
    }

    return (
        <div>
            <h4>&lt;Details about your algorithm&gt;</h4> 
            <p>To understand how each parameter impacts your carbon footprint, check out the formula below and the methods article</p>
            <ul>
                <li><h5>Runtime : </h5> <span>{secondsToHHMM(data.executionTime)}</span></li>
                <li><h5>Type of cores : </h5> <span>{data.coreType}</span></li>
                <li><h5>Number of cores : </h5> <span>{data.coreType=='cpu' ? data.n_cpu : data.n_gpu}</span></li>
                <li><h5>Model : </h5> <span>{data.coreType == 'cpu' ? data.cpuType : data.gpuType}</span></li>
                <li><h5>memory available (inGB) : </h5> <span>{data.memAvailable}</span></li>
                <li><h5>Select the platform used for the computations : </h5> <span>{data.provider}</span></li>
                <li><h5>Select location : </h5> <span>{data.location}</span></li>
                <li><h5>{/*Do you know*/} The real usage factor of your CPU? : </h5> <span>{data.cpuUsage}</span></li>
                <li><h5>{/*Do you know*/} The Power Usage Efficiency (PUE) of your data centre? : </h5> <span>{data.PUE}</span></li>
                <li><h5>{/*Do you want to use*/} A Pragmatic Scaling Factor? : </h5> <span>{data.PSF}</span></li> 
            </ul>
            {/* <div className='buttondiv'>
                <input type="submit" value="Reset" onClick={handleResetClick}></input>
                <input type="submit" value="Change app version"></input>
            </div> */}
        </div>
    );
  }

export default Details;