import React from 'react';
import GridLayout from './GridLayout';

function HorizontalLayout(){
    return (
      <div className='horizontalLayout' style={{ display: 'flex'}}>
        <div className='details' style={{ flex: 1 }}>Details abouut your algorithm</div>
        <div className='resultGrid' style={{ flex: 2}}><GridLayout></GridLayout></div>
      </div>
    );
  }

export default HorizontalLayout;