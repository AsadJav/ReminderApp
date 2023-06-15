import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {COLORS} from '../colors/color';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import ImageComponent from '../components/ImageComponent';
import AppButton from '../components/AppButton';
import AppIcon from '../components/AppIcon';
import {LoginManager} from 'react-native-fbsdk-next';
import {useDispatch} from 'react-redux';
import {deleteUser} from '../Redux/UserSlice';

function ProfileScreen({navigation, route}) {
  const userData = route.params.userData;
  const dispatch = useDispatch();
  return (
    <View>
      <View style={styles.container}>
        <AppIcon
          IconName="arrow-back-outline"
          IconSize={30}
          IconColor={COLORS.white}
          onPressIcon={() => {
            navigation.goBack();
          }}
        />
        <View style={styles.n}>
          <ImageComponent uri={userData.imageURL} style={styles.img} />
          <Text style={styles.txt}>
            {userData.firstName + ' ' + userData.middleName}
          </Text>
        </View>
      </View>
      <View style={styles.txtContainer}>
        <Text style={styles.txt1}>User ID: {userData.userID}</Text>
        <AppButton
          buttonName={'Logout'}
          style={styles.btn}
          color={COLORS.white}
          onPress={() => {
            console.log('Going');
            dispatch(deleteUser(userData));
            LoginManager.logOut();
            navigation.navigate('LoginScreen');
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.purple,
    padding: wp(4),
    width: wp(100),
    height: hp(45),

    fontSize: 100,
  },
  n: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {width: wp(50), height: wp(50), borderRadius: hp(20)},
  txt: {
    color: COLORS.white,
    fontWeight: 'bold',
    fontSize: 30,
    marginTop: hp(3),
  },
  txt1: {color: COLORS.black, fontSize: 20, fontWeight: 'bold'},
  txtContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: hp(10),
  },
  btn: {backgroundColor: COLORS.purple},
});

export default ProfileScreen;
