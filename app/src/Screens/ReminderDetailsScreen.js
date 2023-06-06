import React, {useState} from 'react';
import {StyleSheet, Text, View, Platform, Alert} from 'react-native';
import AppButton from '../components/AppButton';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Picker} from '@react-native-picker/picker';
import AppTextInput from '../components/AppTextInput';
import AppIcon from '../components/AppIcon';
import AppTextPlacer from '../components/AppTextPlacer';
import AppTextBorder from '../components/AppTextBorder';
import {addReminder, updateReminder} from '../Redux/ReminderSlice';
import {useSelector, useDispatch} from 'react-redux';

function checkTextInput(a, b, c) {
  if (!a.trim()) {
    Alert.alert('Please Enter the Reminder Name');
  } else if (!b.trim()) {
    Alert.alert('Please Select the Reminder Date');
  } else if (!c.trim()) {
    Alert.alert('Please Select the Reminder Time');
  } else {
    return true;
  }
}

function ReminderDetailsScreen({navigation, route}) {
  const objData = route.params.obj;
  const [title, setTitle] = useState(objData?.title || '');
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [dt, setDt] = useState(objData?.date || '');
  const [time, setTime] = useState(objData?.time || '');
  const [selectedValue, setSelectedValue] = useState(objData?.repeat || 'None');
  const dispatch = useDispatch();

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);

    let tempDate = new Date(currentDate);
    let fDate =
      tempDate.getDate() +
      '-' +
      (tempDate.getMonth() + 1) +
      '-' +
      tempDate.getFullYear();
    let fTime = tempDate.getHours() + ':' + tempDate.getMinutes();
    setDt(fDate);
    setTime(fTime);
  };
  const showMode = currentMode => {
    setShow(true);
    setMode(currentMode);
  };
  return (
    <View>
      <View style={styles.container}>
        <AppIcon
          name="arrow-back-outline"
          color="white"
          size={30}
          onPress={() => navigation.navigate('Home')}
        />
        <Text style={styles.txt}>What is to be done?</Text>
        <AppTextInput onChangeText={setTitle} value={title} />
        <Text style={styles.txt}>Date</Text>

        <View
          style={{
            flexDirection: 'row',
            marginTop: -20,
            justifyContent: 'flex-end',
          }}>
          <AppTextPlacer
            style={styles.tp1}
            data={dt}
            onPress={() => showMode('date')}
          />

          <AppIcon
            name="calendar-outline"
            size={30}
            color="white"
            onPress={() => showMode('date')}
          />
        </View>
        <AppTextBorder />
        <Text style={styles.txt}>Time</Text>
        <View
          style={{
            flexDirection: 'row',
            marginTop: -20,
            justifyContent: 'flex-end',
          }}>
          <AppTextPlacer
            style={styles.tp}
            data={time}
            onPress={() => showMode('time')}
          />

          <AppIcon
            name="alarm-outline"
            size={30}
            color="white"
            onPress={() => showMode('time')}
          />
        </View>
        <AppTextBorder />
        {show && (
          <DateTimePicker
            testID="datetimepicker"
            value={date}
            mode={mode}
            is24Hour={false}
            display="default"
            onChange={onChange}
            minimumDate={date}
          />
        )}
        <Text style={styles.txt}>Repeat</Text>
        <Picker
          selectedValue={selectedValue}
          style={{
            height: 50,
            width: '90%',
            color: 'white',
          }}
          onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}>
          <Picker.Item label="None" value="NONE" />
          <Picker.Item label="Hourly" value="HOURLY" />
          <Picker.Item label="Daily" value="DAILY" />
          <Picker.Item label="Weekly" value="WEEKLY" />
        </Picker>
        <AppButton
          buttonName="Add Reminder"
          onPress={() => {
            if (route.params.edit == true) {
              if (checkTextInput(title, dt, time) == true) {
                let object = {
                  indexNo: route.params.indexNo,
                  id: route.params.id,
                  title: title,
                  date: dt,
                  time: time,
                  Nd: date.toDateString(),
                  d: date,
                  repeat: selectedValue,
                };
                dispatch(updateReminder(object));
                route.params.updateNotifications(object);
                navigation.goBack();
              }
            } else {
              if (checkTextInput(title, dt, time) == true) {
                let object = {
                  id: Math.floor(Math.random() * (Date.now() / 1000)),
                  title: title,
                  date: dt,
                  time: time,
                  Nd: date.toDateString(),
                  d: date,
                  repeat: selectedValue,
                };
                dispatch(addReminder(object));
                route.params.createNotification(object);
                navigation.goBack();
              }
            }
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {padding: 20, backgroundColor: 'purple', paddingTop: 30},
  txt: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 20,
    marginTop: 30,
    marginBottom: 20,
  },
  tp: {
    fontSize: 16,
    color: 'white',
    marginRight: 250,
    width: '100%',
  },
  tp1: {
    fontSize: 16,
    color: 'white',
    marginRight: 220,
    width: '100%',
  },
});

export default ReminderDetailsScreen;
