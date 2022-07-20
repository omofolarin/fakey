import notifee, { AndroidStyle } from "@notifee/react-native";

import { Platform } from "react-native";
import crashlytics from "@react-native-firebase/crashlytics";

export const ACCEPT_PRESS_ACTION = "accept";
export const REJECT_REJECT_ACTION = "reject";

export const createPushNotification = async () => {
  try {
    const channelId = "custom-sound";
    const soundName = "customsound";

    if (Platform.OS === "android") {
      notifee.createChannel({
        id: channelId,
        name: "Channel with custom sound",
        sound: soundName,
      });

      notifee.displayNotification({
        title: "Hello from fakey",
        body: "fakey let's you add quick call actions to your phone contacts",
        data: {
          type: "localPushNotification",
        },
        android: {
          channelId,

          sound: soundName,
          style: {
            type: AndroidStyle.BIGPICTURE,
            picture: "https://picsum.photos/300/300",
          },
          actions: [
            {
              title: "Accept",
              icon: "https://my-cdn.com/icons/snooze.png",
              pressAction: {
                id: ACCEPT_PRESS_ACTION,
              },
            },

            {
              title: "Reject",
              icon: "https://my-cdn.com/icons/snooze.png",
              pressAction: {
                id: REJECT_REJECT_ACTION,
              },
            },
          ],
        },
      });
    } else if (Platform.OS === "ios") {
      await notifee.setNotificationCategories([
        {
          id: channelId,
          actions: [
            {
              id: ACCEPT_PRESS_ACTION,
              title: "Accept",

              foreground: true,
            },
            {
              id: REJECT_REJECT_ACTION,
              title: "Reject",
              destructive: true,
              // Only show if device is unlocked
              // authenticationRequired: true,
            },
          ],
        },
      ]);
      await notifee.displayNotification({
        title: "Hello from fakey",
        body: "fakey let's you add quick call actions to your phone contacts",
        data: {
          type: "localPushNotification",
        },
        ios: {
          critical: true,
          sound: "local.wav",
          // iOS > 12
          // play at 90% sound volume
          criticalVolume: 0.9,
          categoryId: channelId,
        },
      });
    }
  } catch (error) {
    crashlytics().recordError(error, "createPushNotificationError");
  }
};
