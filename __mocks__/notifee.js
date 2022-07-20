jest.mock("@notifee/react-native", () => ({
  displayNotification: jest.fn(),
  createChannel: jest.fn(),
}));
