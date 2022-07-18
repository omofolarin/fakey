import * as Contacts from "expo-contacts";

import { Contacts as ContactsView, PendingState } from "./src/components";
import {
  DeviceEventEmitter,
  Platform,
  SafeAreaView,
  StyleSheet,
  View,
} from "react-native";

import QuickActions from "react-native-quick-actions";
import React from "react";
import { StatusBar } from "expo-status-bar";
import { ThemeProvider } from "./src/theme/styles";
import messaging from "@react-native-firebase/messaging";
import notifee from "@notifee/react-native";
import { onMessageReceived } from "./src/pushNotifications";
import { useAsync } from "react-async-hook";

messaging().onMessage(onMessageReceived);
messaging().setBackgroundMessageHandler(onMessageReceived);

export default function App() {
  const quickActionShortcut = React.useRef(DeviceEventEmitter);

  const initialNotificationState = useAsync(async () => {
    try {
      const response = await notifee.getInitialNotification();
      if (response) {
        console.log(
          "Notification caused application to open",
          response.notification
        );
        console.log(
          "Notification caused application to open",
          response.pressAction
        );
      }
    } catch (error) {}
  }, []);

  const contactListState = useAsync(async () => {
    try {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === "granted") {
        const { data } = await Contacts.getContactsAsync({
          fields: [Contacts.Fields.Emails, Contacts.Fields.PhoneNumbers],
        });
        return data;
      } else {
        throw new Error("Permission denied");
      }
    } catch (error) {}
  }, []);

  QuickActions.setShortcutItems([
    {
      type: "Orders", // Required
      title: "See your funny", // Optional, if empty, `type` will be used instead
      subtitle: "See orders you've made",
      icon: "Compose", // Icons instructions below
      userInfo: {
        url: "tel:09083494644", //Linking.openURL(`tel:${phoneNumber}`), // Provide any custom data like deep linking URL
      },
    },
  ]);

  React.useEffect(() => {
    const subscription = quickActionShortcut.current.addListener(
      "quickActionShortcut",
      (data) => {
        console.log(data.title);
        console.log(data.type);
        console.log(data.userInfo);
      }
    );

    return () => {
      subscription.remove();
    };
  }, []);

  if (initialNotificationState.status === "loading") {
    return (
      <View>
        <PendingState />
      </View>
    );
  }

  return (
    <ThemeProvider mode={"light"}>
      <SafeAreaView style={styles.container}>
        <StatusBar style="auto" />
        <ContactsView
          data={contactListState.result}
          status={contactListState.status}
        />
      </SafeAreaView>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Platform.select({ ios: 0, android: 40 }),
  },
});
