import { all } from 'redux-saga/effects';
// import handleCreateMap from './createMap';
// import handleUpdateMap from './updateMap';
import handleMap from './map';
import handleAllByCustomer from './getAllByUser';
import handleMapDetail from './getDetail';
import handleInfoInviteMap from './getInfoInviteMap'
import handleSearchMapRequest from './searchMapBySearch'
import handleSearchByKeyMap from './searchMapByKey';
export const mapSaga = function* root() {
  yield all([
    // handleCreateMap(),
    // handleUpdateMap(),
    handleAllByCustomer(),
    handleMapDetail(),
    handleMap(),
    handleInfoInviteMap(),
    handleSearchMapRequest(),
    handleSearchByKeyMap()
  ]);
};
