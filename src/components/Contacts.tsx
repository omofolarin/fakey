import { ScrollView, StyleSheet, Text, View } from "react-native";

import { AsyncStateStatus } from "react-async-hook";
import { Button } from "./Button";
import { ContactList } from "./ContactList";
import { ContactResponse } from "expo-contacts";
import { EmptyState } from "./EmptyState";
import { ErrorState } from "./ErrorState";
import type { FC } from "react";
import { PendingState } from "./PendingState";
import { useTheme } from "../theme";

interface Props {
  data: ContactResponse["data"];
  meta?: {
    hasNextPage?: ContactResponse["hasNextPage"];
    hasPreviousPage?: ContactResponse["hasPreviousPage"];
  };
  status: AsyncStateStatus;
}

const styles = StyleSheet.create({});

export const Contacts: FC<Props> = (props) => {
  const { data, meta, status } = props;
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
            <ErrorState />
          </View>
        );
      }

      default: {
        return null;
      }
    }
  };

  return (
    <View style={[theme.backgroundColor, theme.flex1, theme.column]}>
      <View style={[theme.px16, theme.py8]}>
        <Button
          title={"Send Push Notification"}
          color="secondary"
          style={theme.py8}
        />
      </View>
      <Text style={[theme.headline5Typography, theme.py8, theme.px16]}>
        Contacts
      </Text>

      <View style={[theme.px6]}>{renderContent()}</View>
    </View>
  );
};
