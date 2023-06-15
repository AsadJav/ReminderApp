import React from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';

function ImageComponent({uri, style, data, navigation}) {
  console.log('Data', data);
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('Profile', {userData: data});
      }}>
      <Image source={{uri: uri}} style={[styles.img, style]} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  img: {width: 30, height: 30, borderRadius: 15},
});

export default ImageComponent;
