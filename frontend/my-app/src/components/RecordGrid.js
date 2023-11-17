import React, { useState } from 'react';

const ArrowButton = ({ direction, onClick, size }) => {
    const arrowClass = direction === 'left' ? 'left-arrow' : 'right-arrow';
  
    const buttonStyle = {
      borderWidth: `${size}px ${size * 1.6}px ${size}px 0`, // 동적으로 크기를 조절
    };
  
    return (
      <div className={`arrow-button ${arrowClass}`} style={buttonStyle} onClick={onClick}></div>
    );
  };

  
function RecordGrid(props){

    const gridItems = [];

    // 3x3 그리드 아이템 생성
    for (let i = 1; i <= 9; i++) {
      gridItems.push(<div key={i} className="record-grid-item">
        {i}
        {/*여기다 그리드 레이아웃 하나에 들어갈 것 작성 하면 될 것 같습니다.*/}
      </div>);
    }
  
    const handleLeftClick = () => {
        // 위쪽 화살표 클릭 시 수행할 동작
      console.log('left arrow clicked');
    };
    
    const handleRightClick = () => {
      // 아래쪽 화살표 클릭 시 수행할 동작
      console.log('right arrow clicked');
    };

    return (
        <div>
            <div className="record-grid-container">
                {gridItems}
            </div>
            <div className='page-move'>
                <ArrowButton direction="left" onClick={handleLeftClick} size={20} />
                <div>{/* 목록 페이지 번호 넣으면 될 것 같음 */}</div>
                <ArrowButton direction="right" onClick={handleRightClick} size={20}/>    
            </div>
        </div>
    );
  }

export default RecordGrid;