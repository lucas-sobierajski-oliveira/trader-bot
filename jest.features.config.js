module.exports = {
    clearMocks: true,
    collectCoverage: false,
    coverageDirectory: 'coverage',
    coveragePathIgnorePatterns: [
        'json-server-mock',
        'node_modules',
        'coverage',
        'src/container',
        'src/app/application',
        'src/interfaces',
        'src/infra/logging',
        'test/features'
    ],
    coverageProvider: 'babel',
    coverageReporters: ['json', 'text', 'lcov', 'clover'],
    globalSetup: './test/support/features/setup/jestInit.js',
    globalTeardown: '<rootDir>/test/support/features/setup/jestFinish.js',
    moduleDirectories: ['node_modules', 'src', '.', '<rootDir>'],
    moduleFileExtensions: ['js', 'json', 'jsx', 'ts', 'tsx', 'node'],
    restoreMocks: true,
    rootDir: './',
    roots: ['<rootDir>/test/features'],
    testEnvironment: 'node',
    testPathIgnorePatterns: ['/node_modules/']
};
