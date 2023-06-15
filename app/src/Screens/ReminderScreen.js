import React, {useState} from 'react';
import {StyleSheet, View, FlatList, RefreshControl} from 'react-native';
import notifee, {
  TimestampTrigger,
  TriggerType,
  RepeatFrequency,
  AndroidImportance,
  AndroidCategory,
} from '@notifee/react-native';
import ListComponent from '../components/ListComponent';
import {useSelector, useDispatch} from 'react-redux';
import {deleteReminder} from '../Redux/ReminderSlice';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {COLORS} from '../colors/color';
import HeaderComponent from '../components/HeaderComponent';

function ReminderScreen({navigation}) {
  console.log('Reminder Screen', userData);
  const [refreshing, setRefreshing] = useState(false);
  const storeData = useSelector(state => state.reminders);
  const userData = useSelector(state => state.user.undefined);
  console.log('User', userData);
  const dispatch = useDispatch();
  async function onCreateTriggerNotification(obj) {
    const trigger: TimestampTrigger = {
      type: TriggerType.TIMESTAMP,
      timestamp: obj.Nd.getTime(),
      // repeatFrequency: RepeatFrequency.HOURLY,
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
          sound: 'default',
          fullScreenAction: {
            id: 'default',
          },
          importance: AndroidImportance.HIGH,
          category: AndroidCategory.REMINDER,
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
        userData: userData,
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
      <HeaderComponent
        title="Reminder List"
        IconName1={'add-circle-outline'}
        IconName2={'log-out-outline'}
        onPressIcon1={() => {
          navigation.navigate('Details', {
            userData: userData,
            createNotification: onCreateTriggerNotification,
            edit: false,
          });
        }}
        onPressIcon2={() => {
          console.log('Logged Out');
        }}
        navigation={navigation}
        userData={userData}
      />

      <FlatList
        data={storeData}
        keyExtractor={item => item.id}
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
