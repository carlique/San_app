import React from 'react';
import ReactDOM from 'react-dom';
import ReactStormpath from 'react-stormpath';
import IntlProvider from 'react-intl';
import SanApp from './App';

ReactStormpath.init();

const rootEl = document.getElementById('app-container');
ReactDOM.render(<SanApp />, rootEl);

if (module.hot) {
  module.hot.accept('./App', () => {
    const SanApp = require('./App').default; // eslint-disable-line
    ReactDOM.render(
      <IntlProvider
        locale={`cs-CZ`}
      >
        <SanApp />
      </IntlProvider>,
      rootEl
    );
  });
}
