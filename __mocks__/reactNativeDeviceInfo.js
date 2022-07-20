jest.mock("react-native-device-info", () => {
  return {
    getBuildNumber: () => {},
    getVersion: () => {},
    getDeviceName: () => {},
    getBrand: () => {},
  };
});
