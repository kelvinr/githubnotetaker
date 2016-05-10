import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  Text,
  View,
  WebView
} from 'react-native';

export default class Web extends Component {
  render() {
    return (
      <View style={styles.container}>
        <WebView source={{uri: this.props.url}} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f6ef',
    flexDirection: 'column'
  }
});

