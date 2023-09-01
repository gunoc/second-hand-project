export const setUserInfo = (userInfo: {
  id: number;
  nickname: string;
  imageUrl: string;
}) => {
  localStorage.setItem('userInfo', JSON.stringify(userInfo));
};

export const setTokens = (tokens: {
  accessToken: string;
  refreshToken: string;
}) => {
  localStorage.setItem('token', JSON.stringify(tokens));
};

export const getUserInfo = () => {
  const userInfo = localStorage.getItem('userInfo');

  if (!userInfo) return null;

  return JSON.parse(userInfo);
};

export const getTokens = () => {
  const tokens = localStorage.getItem('token');

  if (!tokens) return null;

  return JSON.parse(tokens);
};

export const clearUserInfo = () => {
  localStorage.removeItem('userInfo');
};

export const clearTokens = () => {
  localStorage.removeItem('token');
}