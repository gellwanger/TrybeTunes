import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Album from '../pages/Album';
import Favorites from '../pages/Favorites';
import Login from '../pages/Login';
import NotFoud from '../pages/NotFound';
import Profile from '../pages/Profile';
import ProfileEdit from '../pages/ProfileEdit';
import Search from '../pages/Search';

class Routes extends Component {
  render() {
    return (
      <Switch className="routes">
        <Route exact path="/" component={ Login } />
        <Route exact path="/album/:id" component={ Album } />
        <Route exact path="/Favorites" component={ Favorites } />
        <Route exact path="/Profile" component={ Profile } />
        <Route exact path="/Profile/Edit" component={ ProfileEdit } />
        <Route exact path="/Search" component={ Search } />
        <Route exact path="*" component={ NotFoud } />
      </Switch>
    );
  }
}

export default Routes;
