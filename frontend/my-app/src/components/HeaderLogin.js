import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import {logout} from '../modules/user.js'
import { useNavigate } from 'react-router-dom';

const HeaderBtn = styled.button`
  margin-top: 4px;
  display: inline-block;
  margin-left: 15px;
  margin-right: 5px;
  padding: 0.25rem 1rem;
  color: white;
  background-color: seagreen;
  outline: none;
  cursor: pointer;
  border: none;
  border-radius: 4px;
`;

const HeaderLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector(({ user }) => ({
    user: user.user,
  }));

  const handleLogout = () => {
    // 사용자 정보와 인증 정보 초기화
    dispatch(logout());
    if(window.location.pathname === '/record'){
      navigate('') 
    }
  };

  const ShowProfile = () => {
    // 일단은 그냥 사용자 정보 보여주는거 alret()로 대체. 사용자 정보 보여주는 페이지 만들면 될 듯?
    alert(
      'name: ' + user.name +
      '\nemail: ' + user.email +
      '\nbirth: '+ user.birthDay
    )
  }

  const LinktoRecord = () => {
    navigate('/record')
  }

  const LinktoLogin = () => {
    navigate('/login')
  }
  const LinktoRegister = () => {
    navigate('/register')
  }

  const LinktoMain = () => {
    navigate('')
  }
  
  return (
    <div className="header-login">
      <article>
        {user ? (
          // 로그인 상태인 경우
          <>
            <span>Welcome, {user.name}!</span>
            <HeaderBtn onClick={handleLogout}>Logout</HeaderBtn>
            {window.location.pathname === '/record' ?
            (<HeaderBtn onClick={LinktoMain}>Main</HeaderBtn>)
            :
            (<HeaderBtn onClick={LinktoRecord}>Record</HeaderBtn>)
            }
            <HeaderBtn onClick={ShowProfile}>Profile</HeaderBtn>
          </>
        ) : (
          // 로그인 상태가 아닌 경우
          <form onSubmit={(event) => { /* Handle form submission if needed */ }}>
            <HeaderBtn onClick={LinktoLogin}>Login</HeaderBtn>
            <HeaderBtn onClick={LinktoRegister}>Logout</HeaderBtn>
          </form>
        )}
      </article>
    </div>
  );
};

const Login = () => {
  return (
    <div className="login">
      <HeaderLogin />
    </div>
  );
};

export default Login;