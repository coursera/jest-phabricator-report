jest.mock('fs');

// Mock return of require('/package.json')
// Virtual because it doesn't actually exist
jest.mock(
  '/package.json',
  () => {
    return {
      'name': 'foo',
      'version': '1.0.0',
      'jest-phabricator-report': {
        suiteName: 'test suite',
      },
    };
  },
  { virtual: true }
);

describe('getOptions', () => {
  it('should support package.json in /', () => {});
});
