module.exports = () => {
  return Object.assign({}, require.requireActual('mkdirp'), {
    sync: jest.fn(),
  });
};
