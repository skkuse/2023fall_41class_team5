import React, { useState } from 'react';

function RecordGrid(props){
    const gridItems = [];

    // 3x3 그리드 아이템 생성
    for (let i = 1; i <= 9; i++) {
      gridItems.push(<div key={i} className="record-grid-item">{i}</div>);
    }
  
    return (
        <div className="record-grid-container">
        {gridItems}
      </div>
    );
  }

export default RecordGrid;