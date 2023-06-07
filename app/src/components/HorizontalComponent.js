import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import AppTextPlacer from './AppTextPlacer';
import AppIcon from './AppIcon';
import AppTextBorder from './AppTextBorder';

function HorizontalComponent({
  data,
  TextStyle,
  style,
  onClicktext,
  heading,
  onPressIcon,
  IconName,
  IconSize,
  IconColor,
  IconStyle,
}) {
  return (
    <View>
      <Text style={TextStyle}>{heading}</Text>
      <View style={styles.container}>
        <AppTextPlacer onPress={onClicktext} data={data} style={style} />
        <AppIcon
          IconName={IconName}
          IconColor={IconColor}
          IconSize={IconSize}
          onPressIcon={onPressIcon}
        />
      </View>
      <AppTextBorder />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginTop: -10,
    justifyContent: 'flex-end',
  },
});

export default HorizontalComponent;
