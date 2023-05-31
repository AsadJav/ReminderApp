import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

function AppTextPlacer({style, data}) {
  return (
    <View>
      <Text style={style}>{data}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default AppTextPlacer;
