import React, { Component } from 'react';
import { ApolloProvider } from 'react-apollo';
import { createBrowserHistory } from 'history';
import { Router, Switch, Route } from 'react-router-dom';

import Header from './components/Header';
import Welcome from './components/Welcome';
import SignIn from './components/auth/SignIn';
import Register from './components/auth/Register';
import ChatWindow from './components/ChatWindow';

import { inject, observer} from 'mobx-react';

const history = createBrowserHistory();

@inject('chatStore')
@observer
class App extends Component {
  render() {
    return (
      <ApolloProvider client={this.props.client}>
        <Router history={history}>
            <div className="app-container">
                <Header title="GraphQL Chat App" />
                <Switch>
                    <Route exact path='/' component={Welcome} />
                    <Route exact path='/signin' component={SignIn} />
                    <Route exact path='/register' component={Register} />
                    <Route exact path='/chat' component={ChatWindow} />
                </Switch>
            </div>
        </Router>
      </ApolloProvider>
    );
  }
}

export default App;
