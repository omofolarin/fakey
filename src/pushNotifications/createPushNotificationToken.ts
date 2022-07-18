import messaging from "@react-native-firebase/messaging";

export async function createPushNotificationToken() {
  await messaging().registerDeviceForRemoteMessages();
  const token = await messaging().getToken();
}
