import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import ConnectScreen from './Screens/Connexion';
import InscriptionScreen from './Screens/Inscription';
import DashScreen from "./Screens/Dashboard";
import NewScreen from "./Screens/NewArea";
import ProfilScreen from "./Screens/Profil";

const RootStack = createStackNavigator(
  {
    Connexion: ConnectScreen,
    Inscriptions: InscriptionScreen,
    Dashboard: DashScreen,
    Ajouter: NewScreen,
    Profil: ProfilScreen,
  },
  {
    initialRouteName: 'Connexion',
  }
);

const AppContainer = createAppContainer(RootStack);

export default class App extends React.Component {
  constructor() {
    super();
    //Setting up global variable
    global.User = new Object();
  }
  render() {
    return <AppContainer />;
  }
}
