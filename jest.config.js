module.exports = {
    testEnvironment: 'node',
    testTimeout: 15000,
    setupFiles: ['dotenv/config'],
    globalSetup: '<rootDir>/tests/setup.js',
    globalTeardown: '<rootDir>/tests/teardown.js',
};
