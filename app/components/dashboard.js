import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight
} from 'react-native';

import api from '../utils/api';
import Profile from './profile';
import Repositories from './repositories';

export default class Dashboard extends Component {
  render() {
    const { userInfo } = this.props;
    console.log(userInfo);

    return (
      <View style={styles.container}>
        <Image source={{uri: this.props.userInfo.avatar_url}} style={styles.image} />
        <TouchableHighlight style={this.makeBackground(0)} onPress={this.goToProfile} underlayColor="#88D4F5">
          <Text style={styles.buttonText}>View Profile</Text>
        </TouchableHighlight>
        <TouchableHighlight style={this.makeBackground(1)} onPress={this.goToRepos} underlayColor="#88D4F5">
          <Text style={styles.buttonText}>View Repos</Text>
        </TouchableHighlight>
        <TouchableHighlight style={this.makeBackground(2)} onPress={this.goToNotes} underlayColor="#88D4F5">
          <Text style={styles.buttonText}>View Notes</Text>
        </TouchableHighlight>
      </View>
    );
  }

  goToProfile = () => {
    this.props.navigator.push({
      title: 'Profile View',
      component: Profile,
      passProps: {userInfo: this.props.userInfo}
    });
  }

  goToRepos = () => {
    let { userInfo } = this.props;

    api.getRepos(userInfo.login)
      .then(res => {
        this.props.navigator.push({
          title: 'Repos',
          component: Repositories,
          passProps: {
            userInfo,
            repos: res
          }
        });
      });
  }

  goToNotes = () => {
    console.log("Going to Notes");
  }

  makeBackground(btn) {
    let obj = {
      flexDirection: 'row',
      alignSelf: 'stretch',
      justifyContent: 'center',
      flex: 1
    }

    if(btn === 0) {
      obj.backgroundColor = '#48ccec';
    } else if(btn === 1) {
      obj.backgroundColor = '#e77aae';
    } else {
      obj.backgroundColor = '#758bf4';
    }

    return obj;
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 65,
    flex: 1
  },
  image: {
    height: 350,
  },
  buttonText: {
    fontSize: 24,
    color: 'white',
    alignSelf: 'center'
  }
});
