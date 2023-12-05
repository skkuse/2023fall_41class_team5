import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Button from '../common/Button';

/**
 * 회원가입 또는 로그인 폼을 보여줍니다.
 */

const AuthFormBlock = styled.div`
  h3 {
    margin: 0;
    color: black;
    margin-bottom: 1rem;
  }
`;

const StyledInput = styled.input`
  font-size: 1rem;
  border: none;
  border-bottom: 1px solid lightgray;
  padding-bottom: 0.5rem;
  outline: none;
  width: 100%;
  &:focus {
    color: black;
    border-bottom: 1px solid black;
  }
  & + & {
    margin-top: 1rem;
  }
`;

const Footer = styled.div`
  margin-top: 2rem;
  text-align: right;
  a {
    color: gray;
    text-decoration: underline;
    &:hover {
      color: green;
    }
  }
`;

const ButtonWithMarginTop = styled(Button)`
  margin-top: 1rem;
`;

const textMap = {
  login: 'LOGIN',
  register: 'REGISTER'
};


const ErrorMessage = styled.div`
  color: red;
  text-align: center;
  font-size: 0.875rem;
  margin-top: 1rem;
`;

const AuthForm = ({ type, form, onChange, onSubmit, error }) => {
  const text = textMap[type];
  return (
    <AuthFormBlock>
      <h3>{text}</h3>
      <form onSubmit={onSubmit}>
        <StyledInput
          autoComplete="loginId"
          name="loginId"
          placeholder="아이디"
          onChange={onChange}
          value={form.loginId}
        />
        <StyledInput
          autoComplete="new-password"
          name="password"
          placeholder="비밀번호"
          type="password"
          onChange={onChange}
          value={form.password}
        />
        {type === 'register' && (<>
          <StyledInput
            autoComplete="new-password"
            name="passwordConfirm"
            placeholder="비밀번호 확인"
            type="password"
            onChange={onChange}
            value={form.passwordConfirm}
          />
          <StyledInput
            autoComplete='name'
            name='name'
            placeholder='이름'
            onChange={onChange}
            value={form.name}
          />
          <StyledInput
            autoComplete="email"
            name="email"
            placeholder="이메일"
            onChange={onChange}
            value={form.email}
          />
          <StyledInput
              type="date"
              name="birthDay"
              autoComplete='birthDay'
              onChange={(e) => {
                const selectedDate = e.target.value;
                const formattedDate = selectedDate && new Date(selectedDate).toISOString().split('T')[0];
                onChange({ target: { name: 'birthDay', value: formattedDate } });
              }}
              value={form.birthDay}
            />     
          </>
        )}
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <ButtonWithMarginTop cyan fullWidth style={{ marginTop: '1rem' }}>
          {text}
        </ButtonWithMarginTop>
      </form>
      <Footer>
        {type === 'login' ? (
          <Link to="/register">Register →</Link>
        ) : (
          <Link to="/login">Log In →</Link>
        )}
      </Footer>
    </AuthFormBlock>
  );
};

export default AuthForm;