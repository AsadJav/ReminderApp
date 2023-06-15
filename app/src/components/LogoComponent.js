import React from 'react';
import {StyleSheet, View} from 'react-native';
import AppIcon from './AppIcon';
import {COLORS} from '../colors/color';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

function LogoComponent({onPressFB}) {
  return (
    <View style={styles.container}>
      <AppIcon
        IconName="logo-google"
        IconSize={40}
        IconColor={COLORS.white}
        IconStyle={styles.icn}
      />
      <AppIcon
        IconName="logo-facebook"
        IconSize={40}
        IconColor={COLORS.white}
        IconStyle={styles.icn}
        onPressIcon={onPressFB}
      />
      {/* <AppIcon IconName="logo-twitter" IconSize={40} IconColor={COLORS.white} /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flexDirection: 'row'},
  icn: {marginRight: wp(5)},
});

export default LogoComponent;
