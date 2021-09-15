import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import createPersistReducer from 'redux/reducers/persist';
import { authenticationReducer } from './authentication';
import { globalReducer } from './global'
import { CategoryReducer } from './category';
import { MapReducer } from './map';
import { HomeReducer } from './home';
import { DiscoverReducer } from './discover';
import { ProfileReducer } from './profile';
import {NotificationReducer} from './notification'
import { NodeReducer } from './node';
import {TagReducer} from './tag'
const createRootReducer = (history) => {
  const reducers = combineReducers({
    authentication: authenticationReducer,
    category: CategoryReducer,
    map: MapReducer,
    router: connectRouter(history),
    global: globalReducer,
    home: HomeReducer,
    discover: DiscoverReducer,
    profile: ProfileReducer,
    notification: NotificationReducer,
    node: NodeReducer,
    tag: TagReducer
  });
  return createPersistReducer(reducers);
};

export default createRootReducer;
