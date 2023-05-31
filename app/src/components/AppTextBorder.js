import React from 'react';
import {StyleSheet, View} from 'react-native';

function AppTextBorder(props) {
  return <View style={styles.container}></View>;
}

const styles = StyleSheet.create({
  container: {
    borderBottomColor: 'white',
    borderBottomWidth: 2,
    width: '100%',
  },
});

export default AppTextBorder;
