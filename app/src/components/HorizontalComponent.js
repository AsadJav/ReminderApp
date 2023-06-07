import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import AppTextPlacer from './AppTextPlacer';
import AppIcon from './AppIcon';
import AppTextBorder from './AppTextBorder';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';

function HorizontalComponent({
  data,
  TextStyle,
  style,
  heading,
  onPress,
  IconName,
  IconSize,
  IconColor,
}) {
  return (
    <View>
      <Text style={TextStyle}>{heading}</Text>
      <View style={styles.container}>
        <AppTextPlacer onPress={onPress} data={data} style={style} />
        <AppIcon
          IconName={IconName}
          IconColor={IconColor}
          IconSize={IconSize}
          onPressIcon={onPress}
        />
      </View>
      <AppTextBorder />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginTop: hp(0.1),
    justifyContent: 'flex-end',
  },
});

export default HorizontalComponent;
