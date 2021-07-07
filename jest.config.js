module.exports = {
    clearMocks: true,
    collectCoverage: true,
    collectCoverageFrom: ['src/**/*.js'],
    coverageDirectory: 'coverage',
    coveragePathIgnorePatterns: [
        'coverage',
        'node_modules',
        'src/container',
        'src/interfaces',
        'json-server-mock',
        'src/infra/logging',
        'src/app/application',
        'src/infra/database/models',
        'src/infra/integration/queue/aws/sqs/eventsQueueConsumer',
        'src/infra/integration/queue/bull',
        'src/infra/integration/cache/aws/redisClient'
    ],
    coverageProvider: 'babel',
    coverageReporters: ['json', 'text', 'lcov', 'clover'],
    coverageThreshold: {
        global: {
            branches: 100,
            functions: 100,
            lines: 100,
            statements: 100
        }
    },
    moduleDirectories: ['node_modules', 'src', '.'],
    moduleFileExtensions: ['js', 'json', 'jsx', 'ts', 'tsx', 'node'],
    rootDir: './',
    roots: ['<rootDir>/src', '<rootDir>/test/unit'],
    testEnvironment: 'node',
    testPathIgnorePatterns: ['/node_modules/']
};
