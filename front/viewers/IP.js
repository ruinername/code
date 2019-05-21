import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Title, Spinner, Text, TextInput, Button } from '@shoutem/ui'
import { connect } from 'react-redux';

import { getIP } from '../reducer';

class Ip extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ip: ''
    }
    this.validateIP = this.validateIP.bind(this);
    this.sendQuery = this.sendQuery.bind(this);
  }

  validateIP(ip) {
    var errored = (/^(?=\d+\.\d+\.\d+\.\d+$)(?:(?:25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]|[0-9])\.?){4}$/.test(ip)) ? false : true;
    this.setState({ip: ip, errored: errored});
  }

  sendQuery() {
    var ip = this.state.errored ? false : this.state.ip;
    this.props.getIP(ip);
  }

  render(){
    const { ip } = this.state;
    return (
      <View style={{width: '92%'}}>

        {this.state.errored && <Text>IP имеет недопустимый формат. При отправке будет использоваться IP Вашего устройства</Text>}
        <TextInput
          placeholder={'Input your IP'}
          value={ip}
          onChangeText={(ip) => this.validateIP(ip)}
        />

        <Button onPress={this.sendQuery} muted={this.state.isErrored} styleName="secondary">
          <Text>load data</Text>
        </Button>

      </View>
    );
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const stateToProps = state => {
  return { ...state };
};

const dispatchToProps = {
  getIP
};

export default connect(stateToProps, dispatchToProps)(Ip);
