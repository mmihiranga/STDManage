import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  StatusBar,
  View,
  Text,
} from 'react-native';

const spinnerLoad = () => (
  <View style={[styles.container, styles.horizontal]}>
    <StatusBar
      translucent={true}
      backgroundColor={'transparent'}
      barStyle={'dark-content'}
    />

    <ActivityIndicator size={45} color="#5956E9" />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
});

export default spinnerLoad;
