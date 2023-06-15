import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {COLORS} from '../colors/color';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import AppTextInput from '../components/AppTextInput';
import AppButton from '../components/AppButton';
import LogoComponent from '../components/LogoComponent';
import fbLogin from '../Auth/fbAuth';
import {useDispatch} from 'react-redux';

function LoginScreen({navigation}) {
  const dispatch = useDispatch();
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Login Screen</Text>
      <AppTextInput placeholder="Enter the username" style={styles.ti} />
      <AppTextInput placeholder="Enter the password" style={styles.ti} />
      <AppButton
        buttonName="Login"
        color={styles.btncolor}
        style={styles.btn}
        onPress={() => {
          console.log('Logged In');
          navigation.navigate('Home');
        }}
      />
      <LogoComponent
        onPressFB={() => {
          fbLogin(navigation, dispatch);
          console.log('Logged In');
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.purple,
    padding: wp(10),
    alignItems: 'center',
  },
  heading: {
    color: COLORS.white,
    fontWeight: 'bold',
    fontSize: 28,
    marginBottom: hp(20),
  },
  ti: {width: wp(90), marginBottom: hp(3)},
  btn: {
    marginTop: hp(5),
    marginBottom: wp(10),
  },
  btncolor: {
    color: COLORS.purple,
  },
});

export default LoginScreen;
