jest.mock("@react-native-firebase/crashlytics", () => {
  return {
    recordError: async (...args) => args,
  };
});
