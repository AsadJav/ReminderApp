import React from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

function AppIcon({IconName, IconSize, IconColor, IconStyle, onPressIcon}) {
  return (
    <TouchableOpacity onPress={onPressIcon}>
      <Icon
        name={IconName}
        size={IconSize}
        color={IconColor}
        style={IconStyle}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default AppIcon;
