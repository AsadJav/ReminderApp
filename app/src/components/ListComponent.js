import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import ReminderScreen from '../Screens/ReminderScreen';
import AppIcon from './AppIcon';

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
      <TouchableOpacity onPress={() => deleteFunc(id)}>
        <AppIcon
          name="trash-outline"
          size={30}
          color="purple"
          style={styles.dIcon}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => editFunc(id)}>
        <AppIcon
          name="create-outline"
          size={30}
          color="purple"
          style={styles.eIcon}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    justifyContent: 'flex-start',
    padding: 20,
    marginHorizontal: 16,
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
    width: '60%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
    width: '90%',
  },
  d: {fontWeight: 'bold', marginTop: 10, marginRight: 10},
  dIcon: {marginTop: 40},
  eIcon: {marginTop: 40, marginLeft: 30},
});

export default ListComponent;
