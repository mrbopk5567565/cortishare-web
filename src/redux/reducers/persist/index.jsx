import { persistReducer  } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

const persistConfig = {
  key: "root",
  storage
};

const createPersistReducer = (rootReducer) => {
  return persistReducer(persistConfig, rootReducer);
};

export default createPersistReducer;
