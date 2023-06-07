import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {COLORS} from '../colors/color';

function AppButton({buttonName, onPress}) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Text style={{color: 'purple', fontWeight: 'bold'}}>{buttonName}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    width: '100%',
    height: 40,
    marginTop: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12.5,
  },
});

export default AppButton;
