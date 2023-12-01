import client from './client';

// 로그인
export const login = ({ loginId, password }) =>
  client.post('/auth', { loginId, password });

// 회원가입
export const register = ({ loginId, password, birthDay, email, name }) =>
  client.post('/users', { loginId, password, birthDay, email, name });

// 로그인 상태 확인
export const check = () => client.get('/check');

// 로그아웃
export const logout = () => client.post('/logout');