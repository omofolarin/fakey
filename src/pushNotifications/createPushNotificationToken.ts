import DeviceInfo from "react-native-device-info";
import { Platform } from "react-native";
import crashlytics from "@react-native-firebase/crashlytics";
import firestore from "@react-native-firebase/firestore";
import messaging from "@react-native-firebase/messaging";
export async function createPushNotificationToken() {
  try {
    if (Platform.OS === "android") {
      await messaging().registerDeviceForRemoteMessages();
    }
    const token = await messaging().getToken();
    const deviceName = await DeviceInfo.getDeviceName();
    const brand = DeviceInfo.getBrand();

    const device = {
      deviceName,
      brand,
    };
    await firestore().collection("Devices").doc(token).set(device);
  } catch (error) {
    crashlytics().recordError(error);
    if (__DEV__) {
      console.log(error);
    }
  }
}
