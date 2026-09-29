const mockValues = new Map();

jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(async key =>
    mockValues.has(key) ? mockValues.get(key) : null,
  ),
  setItem: jest.fn(async (key, value) => {
    mockValues.set(key, value);
  }),
  removeItem: jest.fn(async key => {
    mockValues.delete(key);
  }),
  clear: jest.fn(async () => {
    mockValues.clear();
  }),
}));
