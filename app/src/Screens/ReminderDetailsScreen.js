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
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {COLORS} from '../colors/color';
import HorizontalComponent from '../components/HorizontalComponent';

function checkTextInput(a, b, c) {
  if (!a.trim()) {
    Alert.alert('Please Enter the Reminder Name');
    return false;
  } else if (!b.trim()) {
    Alert.alert('Please Select the Reminder Date');
    return false;
  } else if (!c.trim()) {
    Alert.alert('Please Select the Reminder Time');
    return false;
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
    let fDate = tempDate.toDateString();
    let fTime = tempDate.getHours() + ':' + tempDate.getMinutes();
    setDt(fDate);
    setTime(fTime);
  };
  const showMode = currentMode => {
    setShow(true);
    setMode(currentMode);
  };
  return (
    <View style={styles.container}>
      <AppIcon
        IconName="arrow-back-outline"
        IconColor={COLORS.white}
        IconSize={30}
        onPressIcon={() => navigation.navigate('Home')}
      />
      <Text style={styles.txt}>What is to be done?</Text>
      <AppTextInput
        onChangeText={setTitle}
        value={title}
        placeholder="Write the Reminder Name"
      />
      <HorizontalComponent
        heading="Date"
        TextStyle={styles.txt}
        data={dt}
        style={styles.tp1}
        IconName="calendar-outline"
        IconSize={30}
        IconColor={COLORS.white}
        onPress={() => showMode('date')}
      />
      <HorizontalComponent
        heading="Time"
        TextStyle={styles.txt}
        data={time}
        style={styles.tp}
        IconName="alarm-outline"
        IconSize={30}
        IconColor={COLORS.white}
        onPress={() => showMode('time')}
      />
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
        style={styles.pick}
        dropdownIconColor={COLORS.white}
        onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}>
        <Picker.Item label="None" value="NONE" />
        <Picker.Item label="Hourly" value="HOURLY" />
        <Picker.Item label="Daily" value="DAILY" />
        <Picker.Item label="Weekly" value="WEEKLY" />
      </Picker>
      <AppButton
        buttonName="Add Reminder"
        onPress={() => {
          {
            let object = {
              title: title,
              date: date.toDateString(),
              time: time,
              Nd: date,
              repeat: selectedValue,
            };
            if (route.params.edit == true) {
              if (checkTextInput(title, dt, time) == true) {
                let indexNo = {indexNo: route.params.indexNo};
                let id = {id: route.params.id};
                object = Object.assign(object, indexNo, id);
                dispatch(updateReminder(object));
                route.params.updateNotifications(object);
                navigation.goBack();
              }
            } else {
              if (checkTextInput(title, dt, time) == true) {
                let id = {id: Math.floor(Math.random() * (Date.now() / 1000))};
                object = Object.assign(object, id);
                dispatch(addReminder(object));
                route.params.createNotification(object);
                navigation.goBack();
              }
            }
          }
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: COLORS.purple,
    paddingTop: 30,
  },
  txt: {
    fontWeight: 'bold',
    color: COLORS.white,
    fontSize: 20,
    marginTop: 30,
    marginBottom: 20,
  },
  tp: {
    fontSize: 16,
    color: COLORS.white,
    marginRight: 250,
    width: '100%',
  },
  tp1: {
    fontSize: 16,
    color: COLORS.white,
    marginRight: 170,
    width: '100%',
  },
  pick: {
    height: 50,
    width: '103%',
    color: 'white',
  },
});

export default ReminderDetailsScreen;
