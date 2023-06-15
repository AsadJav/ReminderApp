import React, {useState} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {COLORS} from '../colors/color';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import AppIcon from './AppIcon';
import {LoginManager, AccessToken} from 'react-native-fbsdk-next';
import ImageComponent from './ImageComponent';

function HeaderComponent({
  title,
  IconName1,
  IconName2,
  onPressIcon1,
  onPressIcon2,
  navigation,
  userData,
}) {
  const [username, setUsername] = useState(
    userData.firstName + ' ' + userData.middleName,
  );
  const [imgUrl, setImgUrl] = useState(userData.imageURL);
  console.log('header: ', userData);

  return (
    <View style={styles.outerContainer}>
      <View style={styles.firstStyle}>
        <Text style={styles.txt}>{username}</Text>
        <ImageComponent
          uri={imgUrl}
          style={styles.img}
          data={userData}
          navigation={navigation}
        />
      </View>
      <View style={styles.container}>
        <Text style={styles.txt}>{title}</Text>
        <AppIcon
          IconName={IconName1}
          IconSize={40}
          IconColor={COLORS.white}
          IconStyle={{marginLeft: wp(29)}}
          onPressIcon={onPressIcon1}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    padding: wp(2),
    backgroundColor: COLORS.purple,
  },
  firstStyle: {flexDirection: 'row'},
  img: {marginTop: hp(1), marginLeft: wp(39)},
  container: {
    height: hp(8),
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  txt: {fontSize: 30, color: COLORS.white, fontWeight: 'bold'},
});

export default HeaderComponent;
