import { all } from 'redux-saga/effects';
import handleGetCategory from './getCategory'
export const categorySaga = function* root() {
  yield all([
    handleGetCategory(),
  ]);
};
