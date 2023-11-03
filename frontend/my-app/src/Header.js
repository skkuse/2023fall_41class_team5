import React from 'react';

import Login from './Login';

function Header(){
    return <div className="header">
      <Login></Login>
      <div className="siteName">사이트 이름</div>
    </div>
  }

export default Header;