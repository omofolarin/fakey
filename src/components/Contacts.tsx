import { Linking, StyleSheet, Text, View } from "react-native";

import { AsyncStateStatus } from "react-async-hook";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Button } from "./Button";
import type { Contact } from "expo-contacts";
import { ContactList } from "./ContactList";
import { ContactResponse } from "expo-contacts";
import { ErrorState } from "./ErrorState";
import type { FC } from "react";
import { PendingState } from "./PendingState";
import QuickActions from "react-native-quick-actions";
import crashlytics from "@react-native-firebase/crashlytics";
import { createPushNotification } from "../pushNotifications";
import { useTheme } from "../theme";

interface Props {
  data: ContactResponse["data"];
  meta?: {
    hasNextPage?: ContactResponse["hasNextPage"];
    hasPreviousPage?: ContactResponse["hasPreviousPage"];
  };
  status: AsyncStateStatus;
  reset?: (...args: any[]) => Promise<Contact[]>;
  error?: Error;
}

const styles = StyleSheet.create({});

export const Contacts: FC<Props> = (props) => {
  const { data, meta, status, reset, error } = props;
  const theme = useTheme();

  const renderContent = () => {
    switch (status) {
      case "success": {
        return <ContactList data={data} />;
      }

      case "loading": {
        return <PendingState />;
      }

      case "error": {
        return (
          <View>
            <ErrorState
              title={error?.message ?? "Permission denied"}
              subTitle="To allow fakey to access your contact, change the app permissions settings"
              button={{
                label: "Open app settings",
                onPress: () => Linking.openSettings(),
              }}
            />
          </View>
        );
      }

      default: {
        return null;
      }
    }
  };

  const clearAllQuickCalls = async () => {
    try {
      QuickActions.clearShortcutItems();
      await AsyncStorage.removeItem("quickActionShortcut");
      if (reset) {
        await reset();
      }
    } catch (error) {
      crashlytics().recordError(error, "AsyncStorageError");
    }
  };

  return (
    <View style={[theme.backgroundColor, theme.flex1, theme.column]}>
      <View style={[theme.px16, theme.py8]}>
        <Button
          title={"Send Push Notification"}
          color="secondary"
          style={theme.py8}
          onPress={() => createPushNotification()}
        />
      </View>

      <View style={theme.py8}>
        <View style={[theme.row, theme.justifySpaceBetween, theme.px16]}>
          <Text style={[theme.headline5Typography]}>Contacts</Text>
          <Button
            title="Clear quick calls"
            onPress={() => clearAllQuickCalls()}
          />
        </View>

        <Text style={[theme.captionTypography, theme.py2, theme.px16]}>
          Add app shortcuts for your phone contact to make a quick call.
        </Text>
      </View>

      <View style={[theme.px6]}>{renderContent()}</View>
    </View>
  );
};
