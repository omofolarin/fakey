import { ActivityIndicator, View } from "react-native";

import React from "react";
import { useTheme } from "../theme";

export const PendingState = () => {
  const theme = useTheme();

  return (
    <View style={theme.py12}>
      <ActivityIndicator size="large" color={theme.primaryColor.color} />
    </View>
  );
};
