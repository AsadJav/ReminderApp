import React from 'react';
import {StyleSheet, View} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {COLORS} from '../colors/color';

function AppTextBorder(props) {
  return <View style={styles.container} />;
}

const styles = StyleSheet.create({
  container: {
    borderBottomColor: COLORS.white,
    borderBottomWidth: 2,
    width: '100%',
  },
});

export default AppTextBorder;
