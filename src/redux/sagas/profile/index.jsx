import { all } from 'redux-saga/effects';

import handleProfile from './profileSaga';
export const profileSaga = function* root() {
  yield all([
    handleProfile(),
  ]);
};
