import React from 'react';
import {Button, StyleSheet, View} from 'react-native';
import notifee, {AndroidImportance} from '@notifee/react-native';

function NotificationHandler(props) {
  async function cancel(notificationId) {
    await notifee.cancelNotification(notificationId);
  }
  async function onDisplayNotification() {
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
      importance: AndroidImportance.HIGH,
    });

    await notifee.displayNotification({
      title: 'Notification',
      body: '************',
      android: {
        channelId,
        //smallIcon: 'name-of-a-small-icon', // optional, defaults to 'ic_launcher'.
        // pressAction is needed if you want the notification to open the app when pressed
        pressAction: {
          id: 'default',
        },
      },
    });
  }

  return (
    <View style={styles.container}>
      <Button
        title="Display Notification"
        onPress={() => onDisplayNotification()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default NotificationHandler;
