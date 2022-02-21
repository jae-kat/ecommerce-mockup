const config = {
  preset: 'jest-puppeteer',
  maxWorkers: 2,
  testPathIgnorePatterns: ['<rootDir>/util'],
};

export default config;
