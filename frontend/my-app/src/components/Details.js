import React, { useState } from 'react';

function Details(props){
    // const [result, setResult] = useState(["12H 00M", "CPU", "12", "Xeon E5-2683 v4", "64G", "Local Server", "Austria", "NO", "NO", "NO"]);
    const result = props.data

    return (
        <div>
            <h4>&lt;Details about your algorithm&gt;</h4> 
            <p>To understand how each parameter impacts your carbon footprint, check out the formula below and the methods article</p>
            <ul>
                <li><h5>Runtime : </h5> <span>{result[0]}</span></li>
                <li><h5>Type of cores : </h5> <span>{result[1]}</span></li>
                <li><h5>Number of cores : </h5> <span>{result[2]}</span></li>
                <li><h5>Model : </h5> <span>{result[3]}</span></li>
                <li><h5>memory available (inGB) : </h5> <span>{result[4]}</span></li>
                <li><h5>Select the platform used for the computations : </h5> <span>{result[5]}</span></li>
                <li><h5>Select location : </h5> <span>{result[6]}</span></li>
                <li><h5>Do you know the real usage factor of your CPU? : </h5> <span>{result[7]}</span></li>
                <li><h5>Do you know the Power Usage Efficiency (PUE) of your data centre? : </h5> <span>{result[8]}</span></li>
                <li><h5>Do you want to use a Pragmatic Scaling Factor? : </h5> <span>{result[9]}</span></li> 
            </ul>
            <div className='buttondiv'>
                <input type="submit" value="Reset"></input>
                <input type="submit" value="Change app version"></input>
            </div>
        </div>
    );
  }

export default Details;