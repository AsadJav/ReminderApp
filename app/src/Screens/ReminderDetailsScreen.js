import React, {useState} from 'react';
import {StyleSheet, Text, View, Platform, Alert} from 'react-native';
import AppButton from '../components/AppButton';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Picker} from '@react-native-picker/picker';
import AppTextInput from '../components/AppTextInput';
import AppIcon from '../components/AppIcon';
import {addReminder, updateReminder} from '../Redux/ReminderSlice';
import {useDispatch} from 'react-redux';
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

  function addData(obj) {
    obj.id = Math.floor(Math.random() * (Date.now() / 1000));
    dispatch(addReminder(obj));
    route.params.createNotification(obj);
  }
  function updateData(obj) {
    obj.indexNo = route.params.indexNo;
    obj.id = route.params.id;
    dispatch(updateReminder(obj));
    route.params.updateNotifications(obj);
  }
  function addUpdate() {
    let object = {
      title: title,
      date: date.toDateString(),
      time: time,
      Nd: date,
      repeat: selectedValue,
    };

    if (checkTextInput(title, dt, time) == true) {
      if (route.params.edit == true) {
        object.id = route.params.id;
        updateData(object);
      } else {
        addData(object);
      }
      navigation.goBack();
    }
  }
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
          addUpdate();
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: wp(5),
    backgroundColor: COLORS.purple,
    paddingTop: wp(10),
  },
  txt: {
    fontWeight: 'bold',
    color: COLORS.white,
    fontSize: 20,
    marginTop: wp(5),
    marginBottom: wp(5),
  },
  tp: {
    fontSize: 16,
    color: COLORS.white,
    marginRight: wp(70),
    //width: wp(10),
  },
  tp1: {
    fontSize: 16,
    color: COLORS.white,
    marginRight: wp(45),
    //width: '100%',
  },
  pick: {
    height: hp(5),
    width: wp(90),
    color: COLORS.white,
  },
});

export default ReminderDetailsScreen;
