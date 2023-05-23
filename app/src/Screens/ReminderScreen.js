import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import ListComponent from '../components/ListComponent';

function ReminderScreen({navigation, route}) {
  const [refreshing, setRefreshing] = React.useState(false);
  const [title, setTitle] = useState(route.params?.heading);
  const [date, setDate] = useState(route.params?.pdate);
  const [time, setTime] = useState(route.params?.ptime);
  //const [DATA, setData] = useState([]);
  const [data, setData] = useState([]);
  //const [DATA, setMyData] = React.useState([]);
  //console.log(route.params?.heading, route.params?.pdate, route.params?.ptime);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);
  useEffect(() => {});

  const deleteFunc = id => {
    const updateData = [...data];
    for (var i = 0; i < data.length; i++) {
      console.log(id);
      if (data[i].id == id) {
        updateData.splice(i, 1);
        setData(updateData);
        break;
      }
    }
  };
  const updateFunc = (i, ntitle, ndate, ntime) => {
    const updateData = [...data];
    console.log('Updating');
    updateData[i].title = ntitle;
    updateData[i].dt = ndate + ' ' + ntime;
    setData(updateData);
  };
  const editFunc = id => {
    for (var i = 0; i < data.length; i++) {
      if (data[i].id == id) {
        navigation.navigate({
          name: 'Update',
          params: {rtitle: title, indexNo: i, updateData: updateFunc},
        });
      }
    }
  };

  const addData = obj => {
    const updateData = [...data];
    updateData.unshift(obj);
    setData(updateData);
  };

  console.log(data);
  return (
    <View style={styles.f}>
      <View style={styles.container}>
        <Text style={styles.txt}>Reminder List</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('Details', {addData: addData})}>
          <Icon
            name="add-circle-outline"
            size={40}
            color="white"
            style={{marginLeft: 50, marginTop: 30}}
          />
        </TouchableOpacity>
      </View>

      <FlatList
        data={data}
        renderItem={({item}) => (
          <ListComponent
            title={item.title}
            dt={item.dt}
            id={item.id}
            deleteFunc={deleteFunc}
            editFunc={editFunc}
          />
        )}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            progressBackgroundColor="purple"
          />
        }
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
