import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

function AppTextPlacer({style, data, onPress}) {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={style}>{data}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default AppTextPlacer;
