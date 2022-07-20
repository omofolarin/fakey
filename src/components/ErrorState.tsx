import React, { FC } from "react";
import { Text, View } from "react-native";

import { Button } from "./Button";
import { useTheme } from "../theme";

interface Props {
  title: string;
  subTitle?: string;
  button?: {
    label: string;
    onPress: () => void;
  };
}
export const ErrorState: FC<Props> = (props) => {
  const { title, subTitle, button } = props;
  const theme = useTheme();
  return (
    <View
      style={[
        theme.minFullScreenHeightHalf,
        theme.justifyCenter,
        theme.itemsCenter,
        theme.px12,
        theme.column,
        theme.py12,
      ]}
    >
      <Text style={[theme.headline5Typography, theme.textCenter]}>{title}</Text>
      <Text style={[theme.body1Typography, theme.textCenter]}>{subTitle}</Text>

      {button && (
        <View style={[theme.py12]}>
          <Button title={button.label} onPress={button.onPress} />
        </View>
      )}
    </View>
  );
};
