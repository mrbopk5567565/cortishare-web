import loggerMiddleware from "redux/middlewares/logger";
import routerMiddleware from "redux/middlewares/router";
import sagaMiddleware from "redux/middlewares/saga";

export default (history) => {
  return [routerMiddleware(history), loggerMiddleware, sagaMiddleware];
};
