import React from 'react';
import Login from './HeaderLogin';
import styled from 'styled-components';

const TitleBox = styled.div`
  background-color: rgba(255,255,255,0.5);
  font-size: 45px;
  margin: 0 5%;
  margin-bottom: 20px;
  height: 100px;
  padding: 10px;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  box-shadow: 0px 8px 12px rgba(0, 0, 0, 0.1);
`

function Header(){
    return <div className="header">
      <Login></Login>
      <TitleBox className="siteName">Green Algorithms</TitleBox>
    </div>
  }

export default Header;