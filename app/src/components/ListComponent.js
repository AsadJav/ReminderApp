import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

function ListComponent({title, dt, id}) {
  return (
    <View
      style={{
        flexDirection: 'row',
        backgroundColor: 'white',
      }}>
      <View style={styles.item}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.d}>{dt}</Text>
      </View>
      <TouchableOpacity>
        <Icon
          name="trash-outline"
          size={30}
          color="purple"
          style={{marginTop: 40}}
        />
      </TouchableOpacity>
      <TouchableOpacity>
        <Icon
          name="create-outline"
          size={30}
          color="purple"
          style={{marginTop: 40, marginLeft: 30}}
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
  d: {fontWeight: 'bold', marginTop: 10},
});

export default ListComponent;
