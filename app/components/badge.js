import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';

export default class Badge extends Component {
  static propTypes = {
    userInfo: PropTypes.object.isRequired
  }

  render() {
    const { userInfo } = this.props;

    return (
      <View style={styles.container}>
        <Image style={styles.image} source={{uri: userInfo.avatar_url}} />
        <Text style={styles.name}>{userInfo.name}</Text>
        <Text style={styles.handle}>{userInfo.login}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#48BBEC',
    paddingBottom: 10
  },
  name: {
    alignSelf: 'center',
    fontSize: 21,
    marginTop: 10,
    marginBottom: 5,
    color: 'white'
  },
  handle: {
    alignSelf: 'center',
    fontSize: 16,
    color: 'white'
  },
  image: {
    height: 125,
    width: 125,
    borderRadius: 65,
    marginTop: 10,
    alignSelf: 'center'
  }
});