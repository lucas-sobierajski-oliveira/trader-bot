const awilix = require('awilix');
const container = awilix.createContainer();

const Config = require('../config');
const Exception = require('src/infra/error/exception');
const Application = require('src/app/application');

container
    .register({
        config: awilix.asValue(Config),
        container: awilix.asValue(container),
        exception: awilix.asFunction(Exception),
        application: awilix.asClass(Application).singleton()
    })
    .loadModules(
        [
            'src/app/operations/**/*.js',
            'src/app/services/**/*.js',
            'src/app/strategies/**/*.js',
            'src/domain/enum/**/*.js',
            'src/domain/factories/**/*.js',
            'src/domain/schemas/**/*.js',
            'src/interfaces/**/*.js',
            [
                'src/infra/integration/**/*.js',
                {
                    injectionMode: 'PROXY',
                    lifetime: 'SINGLETON'
                }
            ],
            [
                'src/domain/services/**/*.js',
                {
                    injectionMode: 'PROXY',
                    lifetime: 'SINGLETON'
                }
            ],
            'src/infra/error/**/*.js'
        ],
        {
            formatName: 'camelCase',
            resolverOptions: {
                injectionMode: awilix.InjectionMode.PROXY
            }
        }
    );

module.exports = container;
