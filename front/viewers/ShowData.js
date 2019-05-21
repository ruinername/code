import React, { Component } from 'react';
import {View, Text, Button, Card, Subtitle, Caption, Row, ScrollView} from '@shoutem/ui'
import { StyleSheet } from 'react-native';

import { connect } from 'react-redux';

import { getIP } from '../reducer';

const titles = new Map([
  ['ip', 'IP-адрес'],
  ['country_name', 'Страна'],
  ['region_name', 'Регион'],
  ['city', 'Город'],
  ['zip_code', 'Почтовый индекс'],
  ['time_zone', 'Часовой пояс'],
  ['latitude', 'Широта'],
  ['longitude', 'Долгота']
]);

class ShowData extends React.Component {
  constructor(props) {
    super(props);
  }

  renderRow(prop) {
    let title = titles.get(prop[0]);
    if(title && prop[1]){
      return (
        <Row key={prop[0]}>
          <Subtitle>{title}:</Subtitle>
          <Text numberOfLines={1}>{prop[1]}</Text>
        </Row>
      );
    }
  }

  render(){
    const { response } = this.props;
    return (
      <View style={{width: '92%'}}>
        <ScrollView style={{height: '60%'}}>
          {Object.entries(response).map(item => {
            return this.renderRow(item)
          })}
        </ScrollView>
        <Button onPress={() => (this.props.back('inputIp'))} styleName="secondary">
          <Text>Back</Text>
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

export default connect(stateToProps)(ShowData);
