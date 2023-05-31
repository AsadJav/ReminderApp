import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  RefreshControl,
  LogBox,
} from 'react-native';
import notifee, {
  TimestampTrigger,
  TriggerType,
  AndroidImportance,
} from '@notifee/react-native';
import ListComponent from '../components/ListComponent';
import AppIcon from '../components/AppIcon';
import {useSelector, useDispatch} from 'react-redux';
import {deleteReminder} from '../Redux/ReminderSlice';

function ReminderScreen({navigation}) {
  const [refreshing, setRefreshing] = React.useState(false);

  const storeData = useSelector(state => state.reminders);
  const dispatch = useDispatch();
  console.log('Data' + storeData);

  LogBox.ignoreLogs([
    'Non-serializable values were found in the navigation state',
    'Require cycle: appsrcScreensReminderScreen.js -> appsrccomponentsListComponent.js -> appsrcScreensReminderScreen.js',
  ]);

  async function onCreateTriggerNotification(obj) {
    // Create a time-based trigger
    const trigger: TimestampTrigger = {
      type: TriggerType.TIMESTAMP,
      timestamp: obj.d.getTime(), // fire at 11:10am (10 minutes before meeting)
    };

    await notifee.createTriggerNotification(
      {
        id: obj.id.toString(),
        title: obj.title,
        body: obj.Nd,
        android: {
          channelId: 'default',
          color: '#4caf50',
          importance: AndroidImportance.HIGH,
          actions: [
            {
              title: '<b>Acknowledged!</b>',
              pressAction: {id: 'dance'},
            },
          ],
        },
      },
      trigger,
    );
    console.log('Triggered Notification');
  }

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  const deleteFunc = id => {
    dispatch(deleteReminder(id));
    notifee.cancelNotification(id.toString());
    console.log('Deleted');
  };
  const editFunc = id => {
    let i = storeData.findIndex(item => item.id === id);
    console.log(i);
    let obj = storeData[i];
    console.log(obj);
    navigation.navigate({
      name: 'Details',
      params: {
        edit: true,
        obj: obj,
        indexNo: i,
        id: id,
        updateNotifications: onCreateTriggerNotification,
      },
    });
  };

  return (
    <View style={styles.f}>
      <View style={styles.container}>
        <Text style={styles.txt}>Reminder List</Text>

        <AppIcon
          name="add-circle-outline"
          size={40}
          color="white"
          style={styles.icon}
          onPress={() => {
            console.log('Added');
            navigation.navigate('Details', {
              createNotification: onCreateTriggerNotification,
              edit: false,
            });
          }}
        />
      </View>

      <FlatList
        data={storeData}
        renderItem={({item}) => (
          <ListComponent
            title={item.title}
            dt={item.Nd}
            time={item.time}
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
  icon: {marginLeft: 50, marginTop: 30},
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
