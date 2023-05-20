import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  Platform,
  TouchableOpacity,
} from 'react-native';
import AppButton from '../components/AppButton';
import ReminderScreen from './ReminderScreen';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Picker} from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/Ionicons';

function ReminderDetailsScreen({navigation}) {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [dt, setDt] = useState('Set the date');
  const [time, setTime] = useState('Set the time');
  const [selectedValue, setSelectedValue] = useState('None');

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);

    let tempDate = new Date(currentDate);
    let fDate =
      tempDate.getDate() +
      ' / ' +
      (tempDate.getMonth() + 1) +
      ' / ' +
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
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Icon name="arrow-back-outline" color="white" size={30} />
        </TouchableOpacity>
        <Text style={styles.txt}>What is to be done?</Text>
        <TextInput
          placeholder="Enter the Text Here"
          placeholderTextColor="white"
          onChangeText={setTitle}
          value={title}
          style={{
            borderBottomColor: 'white',
            borderBottomWidth: 2,
            color: 'white',
          }}
        />
        <Text style={styles.txt}>Date</Text>

        <View style={{flexDirection: 'row'}}>
          <Text
            style={{
              // fontWeight: 'bold',
              fontSize: 22,
              color: 'white',
              borderBottomColor: 'white',
              borderBottomWidth: 2,
              width: '90%',
            }}>
            {dt}
          </Text>
          <TouchableOpacity onPress={() => showMode('date')}>
            <Icon name="calendar-outline" size={30} color="white" />
          </TouchableOpacity>
        </View>
        <Text style={styles.txt}>Time</Text>
        <View style={{flexDirection: 'row'}}>
          <Text
            style={{
              // fontWeight: 'bold',
              fontSize: 22,
              color: 'white',
              borderBottomColor: 'white',
              borderBottomWidth: 2,
              width: '90%',
            }}>
            {time}
          </Text>

          <TouchableOpacity onPress={() => showMode('time')}>
            <Icon name="alarm-outline" size={30} color="white" />
          </TouchableOpacity>
        </View>
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
          <Picker.Item label="None" value="none" />
          <Picker.Item label="Once a Day" value="once a day" />
          <Picker.Item label="Once a Day (Mon - Fri)" value="day" />
          <Picker.Item label="Once a Week" value="Once a Week" />
          <Picker.Item label="Once a year" value="Once a year" />
          <Picker.Item label="Other..." value="other" />
        </Picker>
        <AppButton
          buttonName="Add Reminder"
          onPress={() =>
            navigation.navigate({
              name: 'Home',
              params: {heading: title, pdate: dt, ptime: time},
              merge: true,
            })
          }
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
});

export default ReminderDetailsScreen;
