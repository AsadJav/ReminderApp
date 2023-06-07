import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import AppIcon from './AppIcon';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {COLORS} from '../colors/color';

function ListComponent({title, dt, id, deleteFunc, editFunc, time}) {
  return (
    <View style={styles.v1}>
      <View style={styles.item}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.v2}>
          <Text style={styles.d}>{dt}</Text>
          <Text style={styles.d}>{time}</Text>
        </View>
      </View>
      <AppIcon
        IconName="trash-outline"
        IconSize={30}
        IconColor={COLORS.purple}
        IconStyle={styles.dIcon}
        onPressIcon={() => deleteFunc(id)}
      />

      <AppIcon
        IconName="create-outline"
        IconSize={30}
        IconColor={COLORS.purple}
        IconStyle={styles.eIcon}
        onPressIcon={() => editFunc(id)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  v1: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    justifyContent: 'flex-start',
  },
  v2: {
    flexDirection: 'row',
  },
  item: {
    paddingTop: hp(3),
    paddingBottom: hp(3),
    marginHorizontal: 16,
    borderBottomColor: COLORS.gray,
    borderBottomWidth: 1,
    width: wp(60),
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.black,
    width: wp(60),
  },
  d: {fontWeight: 'bold', marginTop: hp(2), marginRight: hp(2)},
  dIcon: {marginTop: hp(6)},
  eIcon: {marginTop: hp(6), marginLeft: wp(9)},
});

export default ListComponent;
