import React, { useState } from 'react';
import CodeInput from '../components/CodeInput';
import HorizontalLayout from '../components/HorizontalLayout';

const testData = {
  "executionTime": 123,
  "coreType": "__",
  "cpuType": "__",
  "n_cpu": '_',
  "cpuUsage": '_',
  "gpuType": "__",
  "n_gpu": '_',
  "gpuUsage": '_',
  "memAvailable": '_',
  "provider": "_",
  "location": "_",
  "kWh": 150,
  "gCo2": 80,
  "treeMonths": 5,
  "driving": 200,
  "flight": 2,
  "userId": 123,
  "javaCode": "YourJavaCode",
  "PUE": "__",
  "PSF": "__"
};

function ContentPage(){
    const [data, setData] = useState(testData);

    return <div className="content">
      <CodeInput setData = {setData}></CodeInput>
      <HorizontalLayout data = {data} setData={setData}></HorizontalLayout>
    </div>
  }


export default ContentPage;