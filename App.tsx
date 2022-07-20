import * as Contacts from "expo-contacts";

import {
  ACCEPT_PRESS_ACTION,
  REJECT_REJECT_ACTION,
  createPushNotificationToken,
  onMessageReceived,
} from "./src/pushNotifications";
import {
  Alert,
  Linking,
  Platform,
  SafeAreaView,
  StyleSheet,
  View,
} from "react-native";
import {
  Contacts as ContactsView,
  ErrorBoundaryFallback,
  ErrorState,
  PendingState,
} from "./src/components";
import notifee, { AuthorizationStatus, EventType } from "@notifee/react-native";

import DeviceInfo from "react-native-device-info";
import ErrorBoundary from "react-native-error-boundary";
import React from "react";
import { StatusBar } from "expo-status-bar";
import { ThemeProvider } from "./src/theme/styles";
import crashlytics from "@react-native-firebase/crashlytics";
import messaging from "@react-native-firebase/messaging";
import { useAsync } from "react-async-hook";

messaging().onMessage(onMessageReceived);

export default function App() {
  const requestIosNotificationPermissionState = useAsync(async () => {
    if (Platform.OS === "ios") {
      const response = await notifee.requestPermission({
        //...,
        criticalAlert: true,
      });
      if (response.authorizationStatus === AuthorizationStatus.DENIED) {
        throw new Error("Permission denied");
      }
    }
  }, []);

  const createPushTokenState = useAsync(async () => {
    await createPushNotificationToken();
  }, []);

  const initialNotificationState = useAsync(async () => {
    try {
      const response = await notifee.getInitialNotification();
      if (response) {
        if (__DEV__) {
          console.log(
            "Notification caused application to open",
            response.notification
          );
          console.log(
            "Notification caused application to open",
            response.pressAction
          );
        }
      }
    } catch (error) {}
  }, []);

  const contactListState = useAsync(async () => {
    const { status } = await Contacts.requestPermissionsAsync();
    if (status === "granted") {
      const { data } = await Contacts.getContactsAsync({
        fields: [Contacts.Fields.Emails, Contacts.Fields.PhoneNumbers],
      });
      return data;
    } else {
      throw new Error("Permission denied");
    }
  }, []);

  React.useEffect(() => {
    return notifee.onForegroundEvent(({ type, detail }) => {
      switch (type) {
        case EventType.DISMISSED:
          console.log("User dismissed notification", detail.notification);
          break;
        case EventType.PRESS:
          console.log("User pressed notification", detail.notification);
          break;
        case EventType.ACTION_PRESS:
          console.log("User clicked action notification", detail.notification);
          console.log(detail.pressAction);
          if (detail.pressAction?.id == ACCEPT_PRESS_ACTION) {
            Alert.alert(
              "You accepted a request on foreground mode",
              "you are seeing this because you pressed accept from a push notification"
            );
          } else if (detail.pressAction?.id == REJECT_REJECT_ACTION) {
            Alert.alert(
              "You rejected a request on foreground mode",
              "you are seeing this because you pressed reject button from a push notification"
            );
          }
      }
    });
  }, []);

  if (initialNotificationState.status === "loading") {
    return (
      <ThemeProvider mode="light">
        <PendingState />
      </ThemeProvider>
    );
  }

  const errorHandler = (error: Error, stackTrace: string) => {
    /* Log the error to an error reporting service */
    crashlytics().recordError(error, "AppCrashed");
    crashlytics().log(`Stack Trace: ${stackTrace}`);
    crashlytics().log(`App build no: ${DeviceInfo.getBuildNumber()}`);
    crashlytics().log(`App version no: ${DeviceInfo.getVersion()}`);
  };

  return (
    <ThemeProvider mode={"light"}>
      <ErrorBoundary
        onError={errorHandler}
        FallbackComponent={ErrorBoundaryFallback}
      >
        <SafeAreaView style={styles.container}>
          <StatusBar style="auto" />
          {requestIosNotificationPermissionState.status === "error" && (
            <View style={styles.py4}>
              <ErrorState
                title={"Notifcation permission denied"}
                subTitle="To allow fakey to send you push notifications, change the app permissions settings"
                button={{
                  label: "Open app settings",
                  onPress: () => Linking.openSettings(),
                }}
              />
            </View>
          )}
          <ContactsView
            data={contactListState.result}
            status={contactListState.status}
            reset={contactListState.execute}
            error={contactListState.error}
          />
        </SafeAreaView>
      </ErrorBoundary>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Platform.select({ ios: 0, android: 40 }),
  },
  py4: {
    paddingVertical: 4,
  },
});
