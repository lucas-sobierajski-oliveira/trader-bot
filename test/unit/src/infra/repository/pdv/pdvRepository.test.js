const Repository = require('src/infra/repository/pdv/pdvRepository');

describe('infra :: repository :: pdv :: pdvRepository', () => {
    describe('#constructor', () => {
        let repository, pdvModel, pdvMapper;

        beforeEach(() => {
            pdvModel = {};
            pdvMapper = {};
            repository = new Repository({ pdvModel, pdvMapper });
        });

        it('Should have properties', async () => {
            expect(repository.ResourceMapper).toBe(pdvMapper);
            expect(repository.ResourceModel).toBe(pdvModel);
        });
    });
});
