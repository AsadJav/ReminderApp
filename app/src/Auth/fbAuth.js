import {LoginManager, Profile} from 'react-native-fbsdk-next';
import {addUser} from '../Redux/UserSlice';
// import {useDispatch} from 'react-redux';

let userData = {};
function fbLogin(navigation, dispatch) {
  //   const dispatch = useDispatch();

  //dispatch(addUser(userData));
  LoginManager.logInWithPermissions(['public_profile']).then(
    function (result) {
      if (result.isCancelled) {
        console.log('Login cancelled');
      } else {
        console.log(
          'Login success with permissions: ' +
            result.grantedPermissions.toString(),
          'Check Data',
          userData,
        );
        const currentProfile = Profile.getCurrentProfile().then(function (
          currentProfile,
        ) {
          if (currentProfile) {
            console.log(
              'The current logged user is: ' +
                currentProfile.name +
                '. His profile id is: ' +
                currentProfile.userID,
            );
            console.log('Above', currentProfile);
            let userID = currentProfile.userID;
            userData = currentProfile;
            console.log('Below', userData);
            dispatch(addUser(userData));
          }
        });
        navigation.navigate({
          name: 'Home',
          params: {userData: userData},
        });
      }
    },
    function (error) {
      console.log('Login fail with error: ' + error);
    },
  );
}

export default fbLogin;
