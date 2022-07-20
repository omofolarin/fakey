import { Text, View } from "react-native";

import { Button } from "./Button";
import React from "react";
import { useTheme } from "../theme";

export function ErrorBoundaryFallback(props: {
  error: Error;
  resetError: () => void;
}) {
  const theme = useTheme();
  return (
    <View style={[theme.justifyCenter, theme.itemsCenter, theme.flex1]}>
      <Text style={[theme.textCenter, theme.headline5Typography]}>Oops!</Text>

      <Text style={[theme.textCenter, theme.subTitle1Typography, theme.py2]}>
        An error occurred 🥺
      </Text>
      <Text style={[theme.textCenter, theme.body1Typography, theme.py4]}>
        {props?.error?.message}
      </Text>

      <Button
        title="Try again"
        onPress={() => {
          props?.resetError?.();
        }}
      ></Button>
    </View>
  );
}
