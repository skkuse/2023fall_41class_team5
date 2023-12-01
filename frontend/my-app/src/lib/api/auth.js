import client from './client';

// 로컬 스토리지에 토큰 저장
export const saveToken = (token) => {
  localStorage.setItem('accessToken', token);
};

// 로컬 스토리지에서 토큰 로드
export const loadToken = () => {
  return localStorage.getItem('accessToken');
};

// 로그인
export const login = ({ loginId, password }) =>
  client.post('/auth', { loginId, password })
    .then(response => {
      const { message, accessToken } = response.data;
      saveToken(accessToken);
      return { message, accessToken };
    });

// 회원가입
export const register = ({ loginId, password, birthDay, email, name }) =>
  client.post('/users', { loginId, password, birthDay, email, name });

export const check = () => {
  const token = loadToken();
  if (!token) {
    return Promise.resolve(null);
  }

  return client.get('/users/me', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  .then(response => {
    const user = response.data;
    return user;
  })
  .catch(error => {
    console.error('로그인 상태 확인 실패:', error);
    return null;
  });
};

// 로그아웃
export const logout = () => {
  // 토큰 제거
  localStorage.removeItem('accessToken');
  return Promise.resolve();
};
