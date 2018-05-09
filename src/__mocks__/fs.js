module.exports = {
  ...require.requireActual('fs'),
  writeFileSync: jest.fn(),
};
