import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import * as Font from 'expo-font';
import Navigator from './src/Navigator';

export default class App extends Component {

  state = {
    fontLoaded: false,
  };

  async componentDidMount() {
    await Font.loadAsync({
      'lato': require('./assets/fonts/Lato.ttf'),
    });

    this.setState({ fontLoaded: true });
  }

  render() {

    return (

      <Navigator />

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  frase: {
    fontFamily: 'lato',
  }
});