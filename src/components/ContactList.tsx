import {
  Alert,
  DeviceEventEmitter,
  FlatList,
  Linking,
  ListRenderItem,
  ListRenderItemInfo,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Contact, ContactResponse } from "expo-contacts";
import React, { FC } from "react";
import { UseTheme, useTheme } from "../theme";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { Avatar } from "./Avatar";
import { Button } from "./Button";
import { EmptyState } from "./EmptyState";
import QuickActions from "react-native-quick-actions";
import crashlytics from "@react-native-firebase/crashlytics";
import { useAsync } from "react-async-hook";

interface Props {
  data: ContactResponse["data"];
}

const contactItem =
  (
    theme: UseTheme,
    onPress: (data: QuickActions.ShortcutItem) => Promise<void>,
    includes: (data: QuickActions.ShortcutItem) => boolean
  ): ListRenderItem<Contact> =>
  (info: ListRenderItemInfo<Contact>) => {
    const contactQuickCall = {
      title: `Call ${info.item.firstName}`,
      type: "quickActionShortcut",
      icon: "",
      userInfo: {
        url: JSON.stringify({
          phoneNumber: info.item.phoneNumbers?.filter((i) => Boolean(i))?.[0]
            ?.number,
        }),
      },
    };

    const handleOnPress = async () => {
      if (info.item.phoneNumbers?.filter((i) => Boolean(i))?.[0]) {
        await onPress(contactQuickCall);
      } else {
        Alert.alert(
          `You can't add this contact - ${info.item.firstName} `,
          "Sorry you cannot add this contact as it does not contain a valid phone number."
        );
      }
    };

    return (
      <View
        key={info.item.id}
        style={StyleSheet.flatten([
          theme.py8,
          theme.px14,
          theme.surfaceColor,
          theme.borderBottomHairline,
          theme.row,
          theme.itemsCenter,
          theme.justifySpaceBetween,
        ])}
      >
        <View style={{ flex: 0.5 }}>
          <Avatar
            character={
              info.item.firstName?.[0] ?? info.item.lastName?.[0] ?? "?"
            }
          />
        </View>

        <View style={{ flex: 2 }}>
          <Text style={[theme.body1Typography]}>
            {info.item.firstName} {info.item.lastName}
          </Text>

          {Boolean(info.item.phoneNumbers?.length) && (
            <Text style={[theme.body2Typography, theme.py4]}>
              {info.item.phoneNumbers?.[0]?.number}
            </Text>
          )}
        </View>

        <View style={{ flex: 0.6 }}>
          <View>
            <Button
              onPress={handleOnPress}
              title={!includes(contactQuickCall) ? "add" : "remove"}
              color={!includes(contactQuickCall) ? "primary" : "secondary"}
              accessibilityLabel={`Add quick action for ${info.item.firstName} ${info.item.lastName}`}
            />
          </View>
        </View>
      </View>
    );
  };

export const ContactList: FC<Props> = (props) => {
  const { data } = props;
  const theme = useTheme();
  const quickActionShortcut = React.useRef(DeviceEventEmitter);

  const [quickActionContacts, setQuickAction] = React.useState<
    QuickActions.ShortcutItem[]
  >([]);

  useAsync(async () => {
    const quickActionString = await AsyncStorage.getItem("quickActionShortcut");
    if (quickActionString && quickActionString.length > 0) {
      const storeValue = JSON.parse(quickActionString)
        .data as QuickActions.ShortcutItem[];

      setQuickAction(storeValue);
    }
  }, []);

  React.useEffect(() => {
    const subscription = quickActionShortcut.current.addListener(
      "quickActionShortcut",
      (data: QuickActions.ShortcutItem) => {
        Linking.openURL(`tel:${JSON.parse(data.userInfo.url).phoneNumber}`);
      }
    );

    return () => {
      subscription.remove();
    };
  }, []);

  const includes = (data: QuickActions.ShortcutItem): boolean => {
    return (
      quickActionContacts.findIndex(
        (v) => v.userInfo.url === data.userInfo.url
      ) !== -1
    );
  };

  const handleQuickCallToggle = async (data: QuickActions.ShortcutItem) => {
    try {
      if (!includes(data)) {
        QuickActions.setShortcutItems([...quickActionContacts, data]);
        setQuickAction([...quickActionContacts, data]);
        await AsyncStorage.setItem(
          "quickActionShortcut",
          JSON.stringify({
            data: [...quickActionContacts, data],
          })
        );
      } else {
        const newItems = quickActionContacts.filter(
          (v) => v.userInfo.url !== data.userInfo.url
        );
        QuickActions.setShortcutItems(newItems);
        setQuickAction(newItems);
        await AsyncStorage.setItem(
          "quickActionShortcut",
          JSON.stringify({ data: newItems })
        );
      }
    } catch (error) {
      crashlytics().recordError(error, "AsyncStorageError");
    }
  };

  return (
    <View>
      <FlatList
        style={theme.minFullScreenH}
        data={data}
        renderItem={contactItem(theme, handleQuickCallToggle, includes)}
        keyExtractor={(item) => item.id}
        maxToRenderPerBatch={20}
        ListEmptyComponent={
          <EmptyState
            title="No contacts found"
            subTitle="Seems you are starting from a clean slate"
          />
        }
      />
    </View>
  );
};
