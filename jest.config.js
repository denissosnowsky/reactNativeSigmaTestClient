/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
const { defaults: tsjPreset } = require('ts-jest/presets');

module.exports = {
  ...tsjPreset,
  preset: 'jest-expo',
  globals: {
    'ts-jest': {
      babelConfig: true,
    },
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
    '^~/(.*)$': '<rootDir>/$1',
    '\\.svg': '<rootDir>/__mocks__/svgMock.js',
    'react-native-code-push': '<rootDir>/__mocks__/react-native-code-push.js',
    '@react-navigation': '<rootDir>/__mocks__/@react-navigation.js',
  },
  testRegex: '(/__tests__/.*|\\.(test|spec))\\.(ts|tsx|js)$',
  transformIgnorePatterns: [
    '<rootDir>/node_modules/(react-clone-referenced-element|@react-native-community|react-navigation|@react-navigation/.*|@unimodules/.*|native-base|react-native-code-push)',
  ],
  testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/cypress/', '\\.snap$'],
  cacheDirectory: '.jest/cache',
  testEnvironment: 'jsdom',
  coverageThreshold: {
    global: {
      statements: 75,
    },
  },
  collectCoverageFrom: [
    '<rootDir>/src/**',
    '!**/index.{js,ts}',
    '!**/*.style.{js,ts}',
    '!<rootDir>/src/store/reducer.ts',
  ],
  coveragePathIgnorePatterns: [
    '<rootDir>/src/assets',
    '<rootDir>/src/global',
    '<rootDir>/src/types',
    '<rootDir>/cypress',
  ],
};
