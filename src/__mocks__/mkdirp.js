const mkdirp = () => ({
  ...require.requireActual('mkdirp'),
  sync: jest.fn(),
});

module.exports = mkdirp();
