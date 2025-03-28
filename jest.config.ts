/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  verbose: true,
  noStackTrace: false,
  testTimeout: 20000,
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'], // Path to your setup file
  extensionsToTreatAsEsm: ['.ts'],
  transform: {
    '^.+\\.tsx?$': ['ts-jest', {useESM: true}],
  },
  // globals: {
  //   "ts-jest": {
  //     useESM: true,
  //   },
  // },
}
