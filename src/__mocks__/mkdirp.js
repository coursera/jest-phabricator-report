module.exports = {
  ...require.requireActual('mkdirp'),
  sync: jest.fn(),
};
