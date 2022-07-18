import React, { FC } from "react";
import { Text, View } from "react-native";

import { useTheme } from "../theme";

interface Props {
  title: string;
  subTitle?: string;
}

export const EmptyState: FC<Props> = (props) => {
  const { title, subTitle } = props;
  const theme = useTheme();
  return (
    <View
      style={[
        theme.minFullScreenH,
        theme.justifyCenter,
        theme.itemsCenter,
        theme.px12,
        theme.column,
        theme.py12,
      ]}
    >
      <Text style={[theme.headline5Typography, theme.textCenter]}>{title}</Text>
      <Text style={[theme.body1Typography, theme.textCenter]}>{subTitle}</Text>
    </View>
  );
};
