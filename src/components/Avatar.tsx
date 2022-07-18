import React, { FC } from "react";
import { StyleSheet, Text, View } from "react-native";

import { useTheme } from "../theme";

interface Props {
  character: string;
}
export const Avatar: FC<Props> = (props) => {
  const { character } = props;
  const theme = useTheme();
  return (
    <View
      style={StyleSheet.flatten([
        { height: 40, width: 40 },
        theme.borderRadiusHalf,
        theme.backgroundColor,
        theme.itemsCenter,
        theme.justifyCenter,
      ])}
    >
      <Text style={theme.body2Typography}>{character}</Text>
    </View>
  );
};
