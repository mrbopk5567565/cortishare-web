import { all } from 'redux-saga/effects';
import handleNode from './nodeSaga';

export const nodeSaga = function* root() {
  yield all([    
    handleNode(),
  ]);
};
