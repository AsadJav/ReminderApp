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
    <View
      style={{
        flexDirection: 'row',
        backgroundColor: 'white',
      }}>
      <View style={styles.item}>
        <Text style={styles.title}>{title}</Text>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.d}>{dt}</Text>
          <Text style={styles.d}>{time}</Text>
        </View>
      </View>
      <AppIcon
        IconName="trash-outline"
        IconSize={30}
        IconColor="purple"
        IconStyle={styles.dIcon}
        onPressIcon={() => deleteFunc(id)}
      />

      <AppIcon
        IconName="create-outline"
        IconSize={30}
        IconColor="purple"
        IconStyle={styles.eIcon}
        onPressIcon={() => editFunc(id)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    justifyContent: 'flex-start',
    padding: 20,
    marginHorizontal: 16,
    borderBottomColor: COLORS.gray,
    borderBottomWidth: 1,
    width: '60%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.black,
    width: '90%',
  },
  d: {fontWeight: 'bold', marginTop: 10, marginRight: 10},
  dIcon: {marginTop: 40},
  eIcon: {marginTop: 40, marginLeft: 30},
});

export default ListComponent;
