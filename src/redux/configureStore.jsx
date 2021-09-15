import { createBrowserHistory } from 'history';
import { applyMiddleware, compose, createStore } from 'redux';
import createRootReducer from 'redux/reducers';
import middlewares from 'redux/middlewares';

export const history = createBrowserHistory();

export const configureStore = (preloadedState) => {
  const composeEnhancer =
    (window).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  const store = createStore(
    createRootReducer(history),
    preloadedState,
    composeEnhancer(applyMiddleware(...middlewares(history)))
  );

  // Hot reloading
  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('redux/reducers', () => {
      store.replaceReducer(createRootReducer(history));
    });
  }

  return store;
};

export default { configureStore, history };
