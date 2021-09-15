import { all } from 'redux-saga/effects';
import handleLogin from './loginRequest';
import handleRegister from './registerRequest';
import handleChangePassword from './changePasswordRequest';
import handleVerifyEmail from './verifyEmail';
import handleResentEmail from './resentEmail'
export const authenSaga = function* root() {
  yield all([
    handleLogin(),
    handleRegister(),
    handleChangePassword(),
    handleVerifyEmail(),
    handleResentEmail()
  ]);
};
