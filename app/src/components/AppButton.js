import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

function AppButton({buttonName, onPress}) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <Text style={{color: 'purple', fontWeight: 'bold'}}>{buttonName}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    width: '100%',
    height: '20%',
    marginTop: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12.5,
    color: 'white',
  },
});

export default AppButton;
