import React from 'react';


function GridLayout(){
    return (
      <div className="grid-container">
        <div className="grid-itemA" style={{gridArea: 'a'}}>1</div>
        <div className="grid-itemA" style={{gridArea: 'b'}}>2</div>
        <div className="grid-itemA" style={{gridArea: 'c'}}>3</div>
        <div className="grid-itemB" style={{gridArea: 'd'}}>4</div>
        <div className="grid-itemB" style={{gridArea: 'e'}}>5</div>
        <div className="grid-itemC" style={{gridArea: 'f'}}>6</div>
      </div>
    );
  }

export default GridLayout;