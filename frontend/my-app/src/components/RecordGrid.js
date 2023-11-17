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

{/* 이 부분 수정하시면 됩니다. */}
function GridItem(props) {
    return <div className="record-grid-item">
        {props.keys}
        {/*여기다 그리드 레이아웃 하나에 들어갈 것 작성 하면 될 것 같습니다.*/}
    </div>
}

function RecordGrid(props) {

    const gridItems = [];

    const gridContents = ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6', 'Item 7', 'Item 8', 'Item 9',
        'Item 10', 'Item 11', 'Item 12', 'Item 13', 'Item 14', 'Item 15', 'Item 16', 'Item 17', 'Item 18', 'Item 19',
        'Item 20', 'Item 21', 'Item 22', 'Item 23', 'Item 24', 'Item 25'];
    const [pageNum, setPageNum] = useState(0);


    // 3x3 그리드 아이템 생성
    for (let i = pageNum * 9 + 0; i < pageNum * 9 + 9; i++) {
        if (i < gridContents.length) {
            gridItems.push(<GridItem keys={gridContents[i]}></GridItem>);
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