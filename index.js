import * as Linking from "expo-linking";

import {
  ACCEPT_PRESS_ACTION,
  REJECT_REJECT_ACTION,
} from "./src/pushNotifications";
import notifee, { EventType } from "@notifee/react-native";

import { Alert } from "react-native";
import App from "./App";
import crashlytics from "@react-native-firebase/crashlytics";
import messaging from "@react-native-firebase/messaging";
import { registerRootComponent } from "expo";

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately

registerRootComponent(App);

/**
 * handle remote notifications when app is on background mode
 **/
messaging().setBackgroundMessageHandler(async (message) => {
  console.log("background", message);
});

notifee.onBackgroundEvent(async ({ type, detail }) => {
  try {
    await Linking.openURL("io.expo.fakey://");
    switch (type) {
      case EventType.DISMISSED:
        console.log("User dismissed notification", detail.notification);
        break;
      case EventType.PRESS:
        console.log("User pressed notification", detail.notification);
        break;
      case EventType.ACTION_PRESS: {
        console.log("User clicked action notification", detail.notification);
        if (detail.pressAction?.id == ACCEPT_PRESS_ACTION) {
          Alert.alert(
            "You accepted a request on background mode",
            "You are seeing this because you pressed accept from a push notification"
          );
        } else if (detail.pressAction?.id == REJECT_REJECT_ACTION) {
          Alert.alert(
            "You rejected a request on background mode",
            "You are seeing this because you pressed reject button from a push notification"
          );
        }
      }
    }
  } catch (error) {
    if (__DEV__) {
      console.log(error);
    }
    crashlytics().recordError(error);
  }
});
