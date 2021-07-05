import { trackPromise } from 'react-promise-tracker';
import axios from 'axios';
import constant from 'lodash/constant';
import history from '../configs/history';
import { requestUrl } from '../configs/request-url';
import { user } from '../util/user';

const DEF_HEADERS = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

const BASE_URL = process.env.REACT_APP_API_ENDPOINT;

const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

const logout = () => {
  localStorage.clear();
  history.push('/login', { prePath: window.location.pathname, expired: true });
};

const get = (path = '', params = {}, headers = DEF_HEADERS) =>
  trackPromise(
    axiosInstance
      .get(path, { headers, params })
      .then(res => res.data)
      .catch(err => Promise.reject(err.response ? err.response.data : err))
  );

const getWithoutTrackLoading = (
  path = '',
  params = {},
  headers = DEF_HEADERS
) =>
  axiosInstance
    .get(path, { headers, params })
    .then(res => res.data)
    .catch(err => Promise.reject(err.response ? err.response.data : err));

const post = (path = '', body = {}, headers = DEF_HEADERS) =>
  trackPromise(
    axiosInstance
      .post(path, body, { headers })
      .then(res => res.data)
      .catch(err => Promise.reject(err.response ? err.response.data : err))
  );

const put = (path = '', body = {}, headers = DEF_HEADERS) =>
  trackPromise(
    axiosInstance
      .put(path, body, { headers })
      .then(res => res.data)
      .catch(err => Promise.reject(err.response ? err.response.data : err))
  );

const del = (path = '', headers = DEF_HEADERS) =>
  trackPromise(
    axiosInstance
      .delete(path, { headers })
      .then(res => res.data)
      .catch(err => Promise.reject(err.response ? err.response.data : err))
  );

const refreshToken = payload =>
  axios
    .post(BASE_URL + requestUrl.auth, payload, {
      headers: DEF_HEADERS,
    })
    .then(res => res.data)
    .catch(() => constant(''));

const requestHandler = async request => {
  const userInfo = user.getUserInfo();

  if (userInfo.idToken) {
    let token = userInfo.idToken;
    const remainTokenTime = userInfo.exp - new Date().getTime() / 1000;
    const timeToRefreshToken = 300; // seconds

    if (remainTokenTime < 0) {
      logout();
      throw new axios.Cancel('err');
    }

    if (remainTokenTime < timeToRefreshToken) {
      const payload = {
        refreshToken: userInfo.refreshToken,
        username: userInfo.email,
      };
      const newToken = await refreshToken(payload);

      if (!newToken) {
        logout();
        throw new axios.Cancel('err');
      }

      user.saveUserStorage(newToken);
      token = newToken.idToken;
    }

    request.headers['Authorization'] = `Bearer ${token}`;
  }

  return request;
};

axiosInstance.interceptors.request.use(requestHandler);

export const requestService = { del, put, post, getWithoutTrackLoading, get };
