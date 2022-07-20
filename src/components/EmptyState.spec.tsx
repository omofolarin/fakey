import "react-native";

import { EmptyState } from "./EmptyState";
import React from "react";
import { ThemeProvider } from "../theme";
import { render } from "@testing-library/react-native";

test("renders empty state", () => {
  const { getByTestId } = render(
    <ThemeProvider mode="light">
      <EmptyState
        title={"No contacts found"}
        subTitle="Seems you are starting from a clean slate"
      />
    </ThemeProvider>
  );
  expect(getByTestId("emptyState")).toHaveTextContent("No contacts found");
  expect(getByTestId("emptyState")).toHaveTextContent(
    "Seems you are starting from a clean slate"
  );
});
