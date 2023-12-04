import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import {logout} from '../modules/user.js'
import { useNavigate } from 'react-router-dom';

const HeaderBtn = styled.button`
  display: inline-block;
  margin-left: 15px;
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

  return (
    <div className="header-login">
      <article>
        {user ? (
          // 로그인 상태인 경우
          <>
            <span>Welcome, {user.name}!</span>
            <HeaderBtn onClick={handleLogout}>Logout</HeaderBtn>
            <HeaderBtn onClick={LinktoRecord}>Record</HeaderBtn>
            <HeaderBtn onClick={ShowProfile}>Profile</HeaderBtn>
          </>
        ) : (
          // 로그인 상태가 아닌 경우
          <form onSubmit={(event) => { /* Handle form submission if needed */ }}>
            <Link to='/login'>Log In →</Link>
            <span> | </span>
            <Link to='/register'>Register →</Link>
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
