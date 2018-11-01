import styles from "./index.scss";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import { createMemoryHistory } from 'history';
import FontawesomeLibrary from "./utils/fontawesome";
import { store } from "./store/store";
import App from "./components/containers/app";

const history = createMemoryHistory();

// Create fontawesome library
FontawesomeLibrary();

// Render root container
ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById("root")
);

// The following is needed so that we can support hot reloading our application.
if (process.env.NODE_ENV === "development" && module.hot) {
  module.hot.accept();
}
