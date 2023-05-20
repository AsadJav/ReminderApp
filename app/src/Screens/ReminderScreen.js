import React, {useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import ListComponent from '../components/ListComponent';

const DATA = [];

function ReminderScreen({navigation, route}) {
  useEffect(() => {
    if (route.params?.heading && route.params?.pdate && route.params?.ptime) {
      DATA.unshift({
        id: Math.floor(Math.random() * (Date.now() / 1000)),
        title: route.params?.heading,
        dt: route.params?.pdate + ' ' + route.params?.ptime,
      });
      console.log(DATA[0]);
    }
  }, [route.params?.heading, route.params?.pdate, route.params?.ptime]);
  return (
    <View style={styles.f}>
      <View style={styles.container}>
        <Text style={styles.txt}>Reminder List</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Details')}>
          <Icon
            name="add-circle-outline"
            size={40}
            color="white"
            style={{marginLeft: 50, marginTop: 30}}
          />
        </TouchableOpacity>
      </View>

      <FlatList
        data={DATA}
        renderItem={({item}) => (
          <ListComponent title={item.title} dt={item.dt} id={DATA.id} />
        )}
        keyExtractor={item => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  f: {
    flex: 1,
  },
  container: {
    backgroundColor: 'purple',
    flexDirection: 'row',
    alignItems: 'center',
  },
  txt: {
    fontSize: 40,
    color: 'white',
    fontWeight: 'bold',
    marginTop: 20,
    marginLeft: 10,
  },
  item: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 24,
  },
});

export default ReminderScreen;
