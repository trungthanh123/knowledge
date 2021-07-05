import { requestUrl } from '../configs/request-url';
import { requestService } from './request.service';

const login = payload => requestService.post(requestUrl.auth, payload);

const changePassword = payload => requestService.post(requestUrl.auth, payload);

const forgotPassword = payload =>
  requestService.post(requestUrl.forgotPassword, payload);

const resetPassword = payload =>
  requestService.post(requestUrl.forgotPassword, payload);

const logout = () => localStorage.clear();

export const authService = {
  logout,
  changePassword,
  login,
  forgotPassword,
  resetPassword,
};
