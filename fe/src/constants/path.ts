export const PATH = {
  home: '/',
  sales: '/sales',
  interests: '/interests',
  chat: '/chat',
  auth: '/auth',
  redirect: '/oauth/redirect',
  signup: '/auth/signup',
  notFound: '/*',
};

export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${
  import.meta.env.VITE_KAKAO_REST_API_KEY
}&redirect_uri=${
  import.meta.env.VITE_ORIGIN_URL + PATH.redirect
}&response_type=code&scope=profile_image`;

export const BASE_URL = import.meta.env.VITE_BASE_URL;
// export const BASE_URL = 'http://ec2-54-180-86-30.ap-northeast-2.compute.amazonaws.com:8080'
