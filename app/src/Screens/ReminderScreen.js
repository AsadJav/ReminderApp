import React from 'react';
import {StyleSheet, View, Text, FlatList, RefreshControl} from 'react-native';
import notifee, {
  TimestampTrigger,
  TriggerType,
  AndroidImportance,
  AndroidCategory,
  RepeatFrequency,
} from '@notifee/react-native';
import ListComponent from '../components/ListComponent';
import AppIcon from '../components/AppIcon';
import {useSelector, useDispatch} from 'react-redux';
import {deleteReminder} from '../Redux/ReminderSlice';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {COLORS} from '../colors/color';

function ReminderScreen({navigation}) {
  const [refreshing, setRefreshing] = React.useState(false);

  const storeData = useSelector(state => state.reminders);
  const dispatch = useDispatch();

  async function onCreateTriggerNotification(obj) {
    // Create a time-based trigger
    const trigger: TimestampTrigger = {
      type: TriggerType.TIMESTAMP,
      timestamp: obj.Nd.getTime(),
      repeatFrequency: RepeatFrequency.HOURLY,
    };
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
      importance: AndroidImportance.HIGH,
      sound: 'default',
    });

    await notifee.createTriggerNotification(
      {
        id: obj.id.toString(),
        title: obj.title,
        body: obj.date + ' ' + obj.time,
        android: {
          channelId,
          color: COLORS.purple,

          category: AndroidCategory.CALL,
          importance: AndroidImportance.HIGH,
          sound: 'default',
          fullScreenAction: {
            id: 'default',
          },

          actions: [
            {
              title: '<b>Open</b>',
              pressAction: {id: 'default'},
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
    console.log(id);
    dispatch(deleteReminder(id));
    notifee.cancelNotification(id.toString());
    console.log('Deleted');
  };
  const editFunc = id => {
    console.log(id);
    let i = storeData.findIndex(item => item.id === id);
    let obj = storeData[i];
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
          IconName="add-circle-outline"
          IconSize={40}
          IconColor={COLORS.white}
          IconStyle={styles.icon}
          onPressIcon={() => {
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
            dt={item.date}
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
            progressBackgroundColor={COLORS.purple}
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
    backgroundColor: COLORS.purple,
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {marginLeft: wp(12), marginTop: hp(4)},
  txt: {
    fontSize: 40,
    color: COLORS.white,
    fontWeight: 'bold',
    marginTop: hp(2),
    marginLeft: wp(3),
  },
  title: {
    fontSize: 24,
  },
});

export default ReminderScreen;
