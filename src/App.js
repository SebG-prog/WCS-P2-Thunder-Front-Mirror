import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Home from './components/pages/Home';
import ThemePage from './components/pages/ThemePage';
import SignIn from './components/pages/SignIn';
import Contact from './components/pages/Contact';
import GameSession from './components/pages/GameSession';
import Page404 from './components/pages/Page404';







class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={GameSession} />
          {/* see how to make a link to the modal page */}
          <Route path="/sign_in/:pseudo" component={SignIn} />
          <Route path="/contact/:pseudo" component={Contact} />
          <Route path="/home/:pseudo" component={Home} />
          <Route component={Page404} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;