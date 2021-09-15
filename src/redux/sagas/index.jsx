import { all } from 'redux-saga/effects';
import { authenSaga } from './authentication'
import { categorySaga } from './category';
import { mapSaga } from './map';
import homeSaga from './home/homeSaga';
import discoverSaga from './discover/discoverSaga';
import { profileSaga } from './profile';
import notificationSaga from './notification/notificationSaga'
import { nodeSaga } from './node'
import tagSaga from './tag'
import globalSaga from './global/globalSaga';

export const rootSaga = function* root() {
  yield all([
    authenSaga(),
    categorySaga(),
    mapSaga(),
    homeSaga(),
    discoverSaga(),
    profileSaga(),
    notificationSaga(),
    nodeSaga(),
    tagSaga(),
    globalSaga()
  ]);
};
