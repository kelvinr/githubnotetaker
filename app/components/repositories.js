import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableHighlight
} from 'react-native';

import Badge from './badge';
import Separator from './helpers/separator';
import Web from './helpers/web';

export default class Repositories extends Component {
  static propTypes = {
    userInfo: PropTypes.object.isRequired,
    repos: PropTypes.array.isRequired
  }

  render() {
    const { userInfo, repos } = this.props;
    let list = repos.map((item, index) => {
      let desc = repos[index].description ? <Text style={styles.description}>{ repos[index].description }</Text> : <View />;
      return (
        <View key={index}>
          <View style={styles.rowContainer}>
            <TouchableHighlight onPress={this.openPage(repos[index].html_url)} underlayColor="blue">
              <Text style={styles.name}>{repos[index].name}</Text>
            </TouchableHighlight>
            <Text style={styles.stars}>Stars: { repos[index].stargazers_count }</Text>
            {desc}
          </View>
          <Separator />
        </View>
      )
    });

    return (
      <ScrollView style={styles.container}>
        <Badge userInfo={userInfo} />
        {list}
      </ScrollView>
    );
  }

  openPage = (url) => {
    this.props.navigator.push({
      component: Web,
      title: 'Web View',
      passProps: {url}
    });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  rowContainer: {
    flexDirection: 'column',
    flex: 1,
    padding: 10
  },
  name: {
    color: '#48BBEC',
    fontSize: 18,
    paddingBottom: 5
  },
  stars: {
    color: '#48BBEC',
    fontSize: 14,
    paddingBottom: 5
  },
  description: {
    fontSize: 14,
    paddingBottom: 5
  }
});
