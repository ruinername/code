import React from 'react';
import { StyleSheet, View } from 'react-native';
import { createStore, applyMiddleware } from 'redux';
import { Provider, connect } from 'react-redux';
import axios from 'axios';
import axiosMiddleware from 'redux-axios-middleware';
import { NavigationBar, Title, Spinner, Button, Text, TextInput } from '@shoutem/ui'
import { Font } from 'expo';

import reducer from './reducer';
import Ip from './viewers/IP';
import ShowData from './viewers/ShowData';



const client = axios.create({
  baseURL: 'http://192.168.1.66:3000',
  responseType: 'json'
});

const store = createStore(reducer, applyMiddleware(axiosMiddleware(client)));

  export default class App extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        loaded: false,
        view: 'inputIp'
      };
    this.changeView = this.changeView.bind(this);
    store.subscribe(() => {
       this.setState({ ...store.getState(), view: 'showdata' });
     });
  }

  changeView(v){
    this.setState({ view: v });
  }

  async componentWillMount() {
    await Font.loadAsync({
      'Rubik-Regular': require('./node_modules/@shoutem/ui/fonts/Rubik-Regular.ttf'),
      'rubicon-icon-font': require('./node_modules/@shoutem/ui/fonts/rubicon-icon-font.ttf'),
      'Roboto': require('./Roboto-Regular.ttf')

    });

    this.setState({loaded: true});
  }

  render() {
    if (!this.state.loaded) {
      return <View style={styles.container}><Spinner /></View>;
    }
    return (
      <Provider store={store}>
        <View style={styles.container}>
          {this.state.view === 'inputIp' && <Ip />}
          {this.state.view === 'showdata' && <ShowData back={this.changeView}/>}
        </View>
      </Provider>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
