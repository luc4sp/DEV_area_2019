import React, { Component } from 'react';
import './App.css';

import 'react-router-dom';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';

import loginPage from './Pages/LoginPage';
import homePage from './Pages/HomePage';
import registerPage from './Pages/RegisterPage';
import ProfilePage from './Pages/ProfilePage';

import { PrivateRoute } from './PrivateRoute'
import Callback from './Pages/Callback';
import CallbackTrello from './Pages/CallbackTrello';
import CallbackSpotify from './Pages/CallbackSpotify';
import CallbackSlack from './Pages/CallbackSlack';
import CallbackImgur from './Pages/CallbackImgur';

export class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      setName: this.setName
    }
  }

  setName = name => {
    this.setName({ name });
  }

  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={loginPage} />
          <Route exact path="/Register" component={registerPage} />
          <PrivateRoute exact path="/HomePage" component={homePage} />
          <PrivateRoute exact path="/ProfilePage" component={ProfilePage} />
          
          <Route exact path="/Callback" component={Callback} />
          <Route exact path="/CallbackTrello" component={CallbackTrello} />
          <Route exact path="/CallbackSpotify" component={CallbackSpotify} />
          <Route exact path="/CallbackSlack" component={CallbackSlack} />
          <Route exact path="/CallbackImgur" component={CallbackImgur} />
          
        </Switch>
      </Router>
    );  
  }
}

export default App;
