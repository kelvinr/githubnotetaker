import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView
} from 'react-native';

import Badge from './badge';
import Separator from './helpers/separator';

export default class Profile extends Component {
  render() {
    const { userInfo } = this.props;
    let topicArr = ['company', 'location', 'followers', 'following', 'email', 'bio', 'public_repos'];
    let list = topicArr.map((item, index) => {
      if(!userInfo[item]) {
        return <View key={index} />;
      } else {
        return (
          <View key={index}>
            <View style={styles.rowContainer}>
              <Text style={styles.rowTitle}>{ this.getRowTitle(userInfo, item) }</Text>
              <Text style={styles.rowContent}>{userInfo[item]}</Text>
            </View>
            <Separator />
          </View>
        );
      }
    });

    return (
      <ScrollView style={styles.container}>
        <Badge userInfo={userInfo} />
        { list }
      </ScrollView>
    );
  }

  getRowTitle(user, item) {
    item = (item === 'public_repos') ? item.replace('_', ' ') : item;

    return item[0] ? item[0].toUpperCase() + item.slice(1) : item;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  rowContainer: {
    padding: 10
  },
  rowTitle: {
    color: '#48BBEC',
    fontSize: 16
  },
  rowContent: {
    fontSize: 19
  }
});
