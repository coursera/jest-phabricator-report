module.exports = () => {
  return Object.assign({}, require.requireActual('fs'), {
    writeFileSync: jest.fn(),
    existsSync: jest.fn().mockReturnValue(true),
  });
};
