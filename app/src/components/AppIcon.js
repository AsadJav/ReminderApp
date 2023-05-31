import React from 'react';
import {StyleSheet, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

function AppIcon({name, size, color, style}) {
  return (
    <View style={styles.container}>
      <Icon name={name} size={size} color={color} style={style} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default AppIcon;
