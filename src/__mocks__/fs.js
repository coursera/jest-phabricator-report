const fs = () => ({
  ...require.requireActual('fs'),
  writeFileSync: jest.fn(),
});

module.exports = fs();
