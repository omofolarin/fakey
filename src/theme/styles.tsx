import { Dimensions, StyleSheet } from "react-native";

import React from "react";

const layoutTheme = StyleSheet.create({
  flex1: {
    flex: 1,
  },
  row: {
    flexDirection: "row",
  },
  column: {
    flexDirection: "column",
  },
  screenH: {
    height: Dimensions.get("window").height,
  },
  screenW: {
    width: Dimensions.get("window").width,
  },
  minFullScreenH: {
    minHeight: Dimensions.get("window").height,
  },
  itemsCenter: {
    alignItems: "center",
  },
  itemsStart: {
    alignItems: "flex-start",
  },
  itemsEnd: {
    alignItems: "flex-end",
  },

  itemsBaseline: {
    alignItems: "baseline",
  },

  selfStart: {
    alignSelf: "flex-start",
  },

  selfEnd: {
    alignSelf: "flex-end",
  },

  selfCenter: {
    alignSelf: "center",
  },

  justifyStart: {
    justifyContent: "flex-start",
  },

  justifySpaceBetween: {
    justifyContent: "space-between",
  },

  justifySpaceAround: {
    justifyContent: "space-around",
  },

  justifySpaceEven: {
    justifyContent: "space-evenly",
  },

  justifyEnd: {
    justifyContent: "flex-end",
  },

  justifyCenter: {
    justifyContent: "center",
  },
});

const spacingTheme = StyleSheet.create({
  px2: {
    paddingHorizontal: 2,
  },
  px4: {
    paddingHorizontal: 4,
  },
  px6: {
    paddingHorizontal: 6,
  },
  px8: {
    paddingHorizontal: 8,
  },
  px12: {
    paddingHorizontal: 12,
  },
  px14: {
    paddingHorizontal: 14,
  },
  px16: {
    paddingHorizontal: 16,
  },
  px32: {
    paddingHorizontal: 16,
  },
  py2: {
    paddingVertical: 2,
  },
  py4: {
    paddingVertical: 4,
  },
  py6: {
    paddingVertical: 6,
  },
  py8: {
    paddingVertical: 8,
  },
  py12: {
    paddingVertical: 12,
  },
  py16: {
    paddingVertical: 16,
  },
  py32: {
    paddingVertical: 16,
  },
  borderBottomHairline: {
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  borderRadius2: {
    borderRadius: 2,
  },
  borderRadius4: {
    borderRadius: 4,
  },
  borderRadius8: {
    borderRadius: 8,
  },
  borderRadius10: {
    borderRadius: 10,
  },
  borderRadius12: {
    borderRadius: 12,
  },
  borderRadius14: {
    borderRadius: 14,
  },
  borderRadius16: {
    borderRadius: 16,
  },
  borderRadius18: {
    borderRadius: 18,
  },
  borderRadius20: {
    borderRadius: 20,
  },
  borderRadiusHalf: {
    borderRadius: 100,
  },
});

enum FontWeight {
  light = "200",
  regular = "400",
  medium = "500",
  bold = "600",
}

enum PrimaryColor {
  main = "#303f9f",
  light = "#666ad1",
  dark = "#001970",
}

enum SecondaryColor {
  main = "#d81b60",
  light = "#ff5c8d",
  dark = "#a00037",
}
const TypographyTheme = StyleSheet.create({
  headline1Typography: {
    fontSize: 96.0,
    fontWeight: FontWeight.light,
    letterSpacing: -1.5,
  },
  headline2Typography: {
    fontSize: 60.0,
    fontWeight: FontWeight.light,
    letterSpacing: -0.5,
  },

  headline3Typography: {
    fontSize: 48.0,
    fontWeight: FontWeight.regular,
    letterSpacing: 0,
  },

  headline4Typography: {
    fontSize: 34.0,
    fontWeight: FontWeight.regular,
    letterSpacing: 0.25,
  },

  headline5Typography: {
    fontSize: 24.0,
    fontWeight: FontWeight.regular,
    letterSpacing: 0,
  },

  headline6Typography: {
    fontSize: 20.0,
    fontWeight: FontWeight.medium,
    letterSpacing: 0.15,
  },

  subTitle1Typography: {
    fontSize: 16.0,
    fontWeight: FontWeight.regular,
    letterSpacing: 0.1,
  },

  subTitle2Typography: {
    fontSize: 14.0,
    fontWeight: FontWeight.medium,
  },

  body1Typography: {
    fontSize: 16.0,
    fontWeight: FontWeight.regular,
  },

  body2Typography: {
    fontSize: 14.0,
    fontWeight: FontWeight.regular,
  },

  buttonTypography: {
    fontSize: 14.0,
    fontWeight: FontWeight.medium,
    letterSpacing: 1.25,
  },
  captionTypography: {
    fontSize: 12.0,
    letterSpacing: 0.4,
    fontWeight: FontWeight.regular,
  },

  overLinkTypography: {
    fontSize: 10.0,
    letterSpacing: 1.5,
  },
  textLeft: {
    textAlign: "left",
  },
  textRight: {
    textAlign: "right",
  },
  textCenter: {
    textAlign: "center",
  },
});

const darkTheme = StyleSheet.create({
  primaryColor: {},
  secondaryColor: {},
  primaryBgColor: {},
  secondaryBgColor: {},
  primaryButtonTextColor: {},
  backgroundColor: {},
  surfaceColor: {},
  borderColor: {
    borderBottomColor: "rgba(255, 255, 255, 0.2)",
  },
});

const lightTheme = StyleSheet.create({
  primaryColor: {
    color: PrimaryColor.main,
  },
  secondaryColor: {
    color: SecondaryColor.main,
  },
  primaryBgColor: {
    backgroundColor: PrimaryColor.main,
  },
  secondaryBgColor: {
    backgroundColor: SecondaryColor.main,
  },
  primaryButtonTextColor: {
    color: "#fff",
  },
  backgroundColor: {
    backgroundColor: "#F0F3F4",
  },
  surfaceColor: {
    backgroundColor: "#FFF",
  },
  borderColor: {
    backgroundColor: "rgba(0, 0, 0, 0.2)",
  },
});

const GrayShades = StyleSheet.create({
  gray100: {},
  gray200: {},
  gray300: {},
  gray400: {},
  gray500: {},
  gray600: {},
  gray700: {},
  gray800: {},
  gray900: {},
});

const ThemeContext = React.createContext(null);

interface Props {
  mode: "light" | "dark";
  children: React.ReactNode;
}

export const ThemeProvider = (props: Props) => {
  const { children, mode } = props;
  const styleSheet =
    mode === "light"
      ? StyleSheet.flatten([
          lightTheme,
          TypographyTheme,
          GrayShades,
          layoutTheme,
          spacingTheme,
        ])
      : StyleSheet.flatten([
          darkTheme,
          TypographyTheme,
          GrayShades,
          layoutTheme,
          spacingTheme,
        ]);

  return (
    <ThemeContext.Provider value={styleSheet}>{children}</ThemeContext.Provider>
  );
};

export type UseTheme = typeof layoutTheme &
  typeof GrayShades &
  typeof TypographyTheme &
  typeof darkTheme &
  typeof lightTheme &
  typeof spacingTheme;

export const useTheme = () => React.useContext<UseTheme>(ThemeContext);
