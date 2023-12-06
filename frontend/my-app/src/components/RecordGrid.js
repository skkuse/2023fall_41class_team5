import React, { useEffect, useState } from 'react';
import { loadToken } from '../lib/api/auth';

const ArrowButton = ({ direction, onClick, size }) => {
    const arrowClass = direction === 'left' ? 'left-arrow' : 'right-arrow';

    const buttonStyle = {
        borderWidth: `${size}px ${size * 1.6}px ${size}px 0`, // 동적으로 크기를 조절
    };

    return (
        <div className={`arrow-button ${arrowClass}`} style={buttonStyle} onClick={onClick}></div>
    );
};


function GridItem(props) {
    const content = props.keys
    const javaCode = content.code
    const title = content.name
    const runTime = content.runTime
    const gCo2 = content.carbonFootprint



    return <div className="record-grid-item">
        <h4>{title}</h4>
        <hr></hr>
       <div className='record-grid-javacode'>{javaCode}</div>
       <hr></hr>
       <div className='record-grid-result'>
        runtime : {runTime}s<br/>
        CarbonFootprint : {gCo2}
       </div>
    
    </div>
}

function RecordGrid(props) {
    const [record, setRecord] = useState({
        "message": "fail",
        "posts": [
            {
            }
        ],
        "totalCount": 0 // 조회된 계산결과 갯수
    });
    const gridItems = [];

    
    const [pageNum, setPageNum] = useState(0);

    const getRecord = async () => {
        try {
            const token = loadToken();

            const response = await fetch('http://localhost:8000/post', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          });
    
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
    
          const data = await response.json();
          console.log('Server Response:', data);
          if (data.message === 'success') {
            // setRecord 함수를 사용하여 상태를 업데이트
            setRecord(data);
          }
    
          // 서버 응답에 대한 추가 로직을 여기에 추가할 수 있습니다.
        } catch (error) {
          console.error('Error:', error);
        }
      };
    
      useEffect(() => {
        // 컴포넌트가 마운트될 때 getRecord 함수를 호출
        getRecord();
      }, []); // useEffect의 두 번째 매개변수로 빈 배열을 전달하여 한 번만 실행되도록 설정
    


    const gridContents = record.posts;
    const recordSize = record.totalCount;

    // 3x3 그리드 아이템 생성
    for (let i = pageNum * 9 + 0; i < pageNum * 9 + 9; i++) {
        if (i < recordSize) {
            gridItems.push(<GridItem key = {i} keys={gridContents[recordSize - 1 - i]}></GridItem>);
        }
    }

    const handleLeftClick = () => {
        // 위쪽 화살표 클릭 시 수행할 동작
        //   console.log('left arrow clicked');
        if (pageNum > 0) setPageNum(pageNum - 1)
    };

    const handleRightClick = () => {
        // 아래쪽 화살표 클릭 시 수행할 동작
        //   console.log('right arrow clicked');
        if (pageNum < Math.floor(gridContents.length / 9)) setPageNum(pageNum + 1)
    };

    const handlePageClick = (selectedPage) => {
        setPageNum(selectedPage);
      };    


    // 페이지 목록 생성(하단)
    const pageList = [];
    for (let i = 0; i <= Math.min(Math.floor(gridContents.length / 9), 9); i++) {
        const isActive = i === pageNum;
        pageList.push(
            <div key={i} className={`page-number ${isActive ? 'active' : ''}`} onClick={() => handlePageClick(i)}>
                {i + 1}
            </div>
        );
    }
    

    return (
        <div>
            <div className="record-grid-container">
                {gridItems}
            </div>
            <div className='page-move'>
                <ArrowButton direction="left" onClick={handleLeftClick} size={20} />
                <div className="page-list-container">{pageList}</div>
                <ArrowButton direction="right" onClick={handleRightClick} size={20} />
            </div>
        </div>
    );
}

export default RecordGrid;