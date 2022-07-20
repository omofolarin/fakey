jest.mock("@react-native-firebase/firestore", () => ({
  collection: jest.fn(),
}));
