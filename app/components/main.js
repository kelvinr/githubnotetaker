import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableHighlight,
  ActivityIndicatorIOS
} from 'react-native';
import api from '../utils/api';
import Dashboard from './dashboard';

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      isLoading: false,
      error: false
    }
  }

  render() {
    let showErr = (
      this.state.error ? <Text>{this.state.error}</Text> : <View></View>
    );

    return (
      <View style={styles.mainContainer}>
        <Text style={styles.title}>Search for a Github User</Text>
        <TextInput
          autoCapitalize={('none')} 
          style={styles.searchInput} 
          value={this.state.username} 
          onChange={this.handleChange} />

          <TouchableHighlight 
            style={styles.button}
            onPress={this.handleSubmit}
            underlayColor="white">
            
            <Text style={styles.buttonText}>SEARCH</Text>
          </TouchableHighlight>
          <ActivityIndicatorIOS
            animating={this.state.isLoading}
            color="#111"
            size="large" />
          {showErr}
      </View>
    );
  }

  handleChange = (event) => {
    this.setState({
      username: event.nativeEvent.text
    });
  }

  handleSubmit = (e) => {
    this.setState({isLoading: true});
    api.getBio(this.state.username)
      .then((res) => {
        if(res.message === 'Not Found') {
          this.setState({
            error: 'User not found',
            isLoading: false
          })
        } else {
          this.props.navigator.push({
            title: res.name || "Select an Option",
            component: Dashboard,
            passProps: {userInfo: res}
          });

          this.setState({isLoading: false, error: false, username: ''});
        }
      })
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 30,
    marginTop: 65,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#48BBEC',
  },
  title: {
    marginBottom: 20,
    fontSize: 25,
    textAlign: 'center',
    color: '#FFF'
  },
  searchInput: {
    height: 50,
    padding: 4,
    marginRight: 5,
    fontSize: 23,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 8,
    color: 'white'
  },
  button: {
    height: 45,
    flexDirection: 'row',
    backgroundColor: 'white',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    marginTop: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  buttonText: {
    fontSize: 18,
    color: '#111',
    alignSelf: 'center'
  }
});
