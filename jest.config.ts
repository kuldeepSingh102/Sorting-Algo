import type { JestConfigWithTsJest } from 'ts-jest';

const config: JestConfigWithTsJest = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@sortViz/(.*)$': '<rootDir>/src/apps/sorting-visualizer/$1',
  },
  testTimeout: 20000,
};

export default config;
