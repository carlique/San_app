import React from 'react';
import ReactDOM from 'react-dom';
import ReactStormpath from 'react-stormpath';
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import SanApp from './App';
import SANApp from './reducers/reducers'

let store = createStore(SANApp);

ReactStormpath.init();

const rootEl = document.getElementById('app-container');
ReactDOM.render(
  <Provider store={store}>
    <SanApp />
  </Provider>,
  rootEl
);

if (module.hot) {
  module.hot.accept('./App', () => {
    const SanApp = require('./App').default; // eslint-disable-line
    ReactDOM.render(
      <Provider store={store}>
        <SanApp />
      </Provider>,
      rootEl
    );
  });
}
