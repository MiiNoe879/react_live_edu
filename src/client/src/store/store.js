import { createMemoryHistory } from "history";
import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension/logOnlyInProduction";
import { connectRouter, routerMiddleware } from "connected-react-router";
import createSagaMiddleware from "redux-saga";
import rootReducer from "./reducers";
import { rootSaga } from "./sagas";
import SagaManager from "./sagas";

// HMR
// https://github.com/xkawi/react-universal-saga/issues/8

function configureStore(preloadedState) {
  const sagaMiddleware = createSagaMiddleware(rootSaga);
  const connectedRouterMiddleware = routerMiddleware(history);

  const middlewares = [sagaMiddleware, connectedRouterMiddleware];
  const middlewareEnhancer = applyMiddleware(...middlewares);

  const enhancers = [middlewareEnhancer];
  const composedEnhancers = composeWithDevTools(...enhancers);

  const connectedRootReducer = reducer => {
    return connectRouter(history)(reducer);
  };

  const store = createStore(
    connectedRootReducer(rootReducer),
    preloadedState,
    composedEnhancers
  );

  sagaMiddleware.run(rootSaga);

  // Create hook for async sagas
  store.runSaga = sagaMiddleware.run;
  store.startAbortableSaga = () => SagaManager.startSaga(sagaMiddleware);
  store.close = () => store.dispatch(END);

  // HMR for reducers and sagas
  if (module.hot) {
    module.hot.accept("./reducers", () => {
      const nextRootReducer = require("./reducers").default;
      store.replaceReducer(connectedRootReducer(nextRootReducer));
    });

    module.hot.accept("./sagas", () => {
      SagaManager.cancelSaga(store);
      require("./sagas").default.startSaga(sagaMiddleware);
    });
  }

  return store;
}

export const history = createMemoryHistory();
export const store = configureStore();
