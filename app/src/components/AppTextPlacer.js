import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';

function AppTextPlacer({style, data, onPress}) {
  return (
    <View>
      <TouchableOpacity onPress={onPress}>
        <Text style={style}>{data}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default AppTextPlacer;
