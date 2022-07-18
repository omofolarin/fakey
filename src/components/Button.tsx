import React, { FC } from "react";
import {
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
  ViewStyle,
} from "react-native";

import { useTheme } from "../theme";

interface Props extends TouchableOpacityProps {
  onPress?: () => void;
  title: string;
  style?: ViewStyle;
  textStyle?: TextStyle;
  color?: "primary" | "secondary";
}

export const Button: FC<Props> = (props) => {
  const {
    onPress,
    title,
    style,
    textStyle,
    color = "primary",
    ...rest
  } = props;
  const theme = useTheme();
  const themeColorStyle =
    color === "primary" ? theme.primaryBgColor : theme.secondaryBgColor;

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        StyleSheet.flatten([
          theme.px4,
          theme.py4,
          themeColorStyle,
          theme.borderRadius4,
        ]),
        style,
      ]}
      {...rest}
    >
      <Text
        style={[
          StyleSheet.flatten([
            theme.buttonTypography,
            theme.primaryButtonTextColor,
            theme.textCenter,
          ]),
          textStyle,
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};
