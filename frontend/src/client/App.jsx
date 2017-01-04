import React from 'react';
import 'bootstrap/less/bootstrap.less';
import { IndexRoute, Route, browserHistory } from 'react-router';
import ReactStormpath, { Router, HomeRoute, LoginRoute, AuthenticatedRoute } from 'react-stormpath';
import { MasterPage, ContactsPage, CalculationsPage, IndexPage, LoginPage} from './pages';

export default class App extends React.Component {

  render () {
    return (
      <Router history={browserHistory}>
        <HomeRoute path="/" component={MasterPage}>
          <IndexRoute component={IndexPage} />
          <LoginRoute path="/login" component={LoginPage} />
          <Route path="/contacts" component={ContactsPage} />
          <Route path="/calculations" component={CalculationsPage} />
        </HomeRoute>
      </Router>
    );
  }

}
