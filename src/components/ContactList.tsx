import { Contact, ContactResponse } from "expo-contacts";
import {
  FlatList,
  ListRenderItem,
  ListRenderItemInfo,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { FC } from "react";
import { UseTheme, useTheme } from "../theme";

import { Avatar } from "./Avatar";
import { Button } from "./Button";
import { EmptyState } from "./EmptyState";

interface Props {
  data: ContactResponse["data"];
}

const styles = StyleSheet.create({});

const contactItem =
  (theme: UseTheme): ListRenderItem<Contact> =>
  (info: ListRenderItemInfo<Contact>) => {
    // console.log(info.item.firstName?.[0]);

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

        <View style={{ flex: 0.5 }}>
          <View>
            <Button
              onPress={() => {}}
              title="Add"
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

  return (
    <View>
      <FlatList
        style={theme.minFullScreenH}
        data={data}
        renderItem={contactItem(theme)}
        keyExtractor={(item) => item.id}
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
