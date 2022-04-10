const nextJest = require('next/jest');

const createJestConfig = nextJest({dir: './src'});

const customJestConfig = {
  coverageProvider: 'v8',
  setupFilesAfterEnv: [
    '<rootDir>/src/tests/setupTests.ts'
  ],
  moduleNameMapper: {
    '^@/components/(.*)$': '<rootDir>/src/components/$1',

    '^@/pages/(.*)$': '<rootDir>/src/pages/$1',
  },
  testEnvironment: 'jest-environment-jsdom',
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.tsx',
    '!src/**/*.spec.tsx',
    '!src/**/_app.tsx',
    '!src/**/_document.tsx',
  ],
  moduleDirectories: ['node_modules', '<rootDir>/src'],
  setupFilesAfterEnv: [
    '<rootDir>/src/tests/setupTests.ts'
  ],
  coverageReporters: ['lcov', 'json']
}

module.exports = createJestConfig(customJestConfig);