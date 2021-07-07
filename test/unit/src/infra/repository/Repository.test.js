const Repository = require('src/infra/repository/Repository');

describe('infra :: repository :: Repository', () => {
    describe('#constructor', () => {
        let ResourceModel, ResourceMapper, repository;

        beforeEach(() => {
            ResourceModel = {};
            ResourceMapper = {};
            repository = new Repository({ ResourceModel, ResourceMapper });
        });

        it('Should have properties', async () => {
            expect(repository.ResourceMapper).toBe(ResourceMapper);
            expect(repository.ResourceModel).toBe(ResourceModel);
        });
    });

    describe('#methods', () => {
        let ResourceModel, ResourceMapper, repository;

        beforeEach(() => {
            ResourceModel = {
                countDocuments: jest.fn(),
                find: jest.fn(),
                paginate: jest.fn(),
                findOne: jest.fn().mockReturnThis(),
                findOneAndRemove: jest.fn(),
                limit: jest.fn()
            };
            ResourceMapper = { toEntity: jest.fn() };
            repository = new Repository({ ResourceModel, ResourceMapper });
        });

        it('Should call #count with query', async () => {
            const query = { id: 1 };

            await repository.count(query);

            expect(ResourceModel.countDocuments).toHaveBeenCalledWith(query);
            expect(repository.ResourceMapper).toBe(ResourceMapper);
            expect(repository.ResourceModel).toBe(ResourceModel);
        });

        it('Should call #find with query and with fields', async () => {
            const query = { id: 1 };
            const fields = { id: true };

            await repository.find(query, fields);

            expect(ResourceModel.find).toHaveBeenCalledWith(query, fields);
            expect(ResourceMapper.toEntity).toHaveBeenCalled();
        });

        it('Should call #find with query and without fields', async () => {
            const query = { id: 1 };
            const fields = {};

            await repository.find(query);

            expect(ResourceModel.find).toHaveBeenCalledWith(query, fields);
            expect(ResourceMapper.toEntity).toHaveBeenCalled();
        });

        it('Should call #findPaginate with query and options', async () => {
            const query = { id: 1 };
            const options = { limit: 1 };

            await repository.findPaginate(query, options);

            expect(ResourceModel.paginate).toHaveBeenCalledWith(query, options);
            expect(ResourceMapper.toEntity).toHaveBeenCalled();
        });

        it('Should call #findOne with query and with fields', async () => {
            const query = { id: 1 };
            const fields = { id: true };

            await repository.findOne(query, fields);

            expect(ResourceModel.findOne).toHaveBeenCalledWith(query, fields);
            expect(ResourceMapper.toEntity).toHaveBeenCalled();
        });

        it('Should call #findOne with query and without fields', async () => {
            const query = { id: 1 };
            const fields = {};

            await repository.findOne(query);

            expect(ResourceModel.findOne).toHaveBeenCalledWith(query, fields);
            expect(ResourceMapper.toEntity).toHaveBeenCalled();
        });

        it('Should call #remove with query', async () => {
            const query = { id: 1 };

            await repository.remove(query);

            expect(ResourceModel.findOneAndRemove).toHaveBeenCalledWith(query);
            expect(ResourceMapper.toEntity).toHaveBeenCalled();
        });
    });

    describe('#methods CREATE', () => {
        let saveMethod, ResourceModel, ResourceMapper, repository;

        beforeEach(() => {
            saveMethod = jest.fn();
            ResourceModel = jest.fn().mockImplementation(() => {
                return {
                    save: saveMethod
                };
            });
            ResourceMapper = { toEntity: jest.fn(), toDatabase: jest.fn() };
            repository = new Repository({ ResourceModel, ResourceMapper });
        });

        it('Should call model save', async () => {
            const data = { id: '' };

            await repository.create(data);

            expect(ResourceModel).toHaveBeenCalledWith(ResourceMapper.toDatabase(data));
            expect(ResourceModel).toHaveBeenCalledTimes(1);
            expect(saveMethod).toHaveBeenCalled();
        });
    });

    describe('#methods CREATE', () => {
        let saveMethod, ResourceModel, ResourceMapper, repository;
        const error = new Error('databaseError');

        beforeEach(() => {
            saveMethod = jest.fn().mockImplementation(() => {
                throw error;
            });
            ResourceModel = jest.fn().mockImplementation(() => {
                return {
                    save: saveMethod
                };
            });
            ResourceMapper = { toEntity: jest.fn(), toDatabase: jest.fn() };
            repository = new Repository({ ResourceModel, ResourceMapper });
        });

        it('Should call model save', async () => {
            const data = { id: '' };

            try {
                expect(await repository.create(data)).toThrowError();
            } catch (err) {
                expect(ResourceModel).toHaveBeenCalledWith(ResourceMapper.toDatabase(data));
                expect(ResourceModel).toHaveBeenCalledTimes(1);
                expect(saveMethod).toHaveBeenCalled();
                expect(ResourceMapper.toEntity).not.toHaveBeenCalled();
                expect(err).toEqual(error);
            }
        });
    });

    describe('#methods UPDATE', () => {
        let ResourceModel, ResourceMapper, repository;

        beforeEach(() => {
            ResourceModel = { findOneAndUpdate: jest.fn() };
            ResourceMapper = { toEntity: jest.fn(), toDatabase: jest.fn() };
            repository = new Repository({ ResourceModel, ResourceMapper });
        });

        it('Should call model update', async () => {
            const data = { id: '2' };
            const query = { id: 1 };
            const options = { new: true, upsert: false, runValidators: true };

            await repository.update(query, data);

            expect(ResourceModel.findOneAndUpdate).toHaveBeenCalledWith(
                query,
                data,
                options
            );
            expect(ResourceMapper.toEntity).toHaveBeenCalled();
        });
    });

    describe('#methods UPDATE', () => {
        let updateMethod, ResourceModel, ResourceMapper, repository;
        const error = new Error('databaseError');

        beforeEach(() => {
            updateMethod = jest.fn().mockImplementation(() => {
                throw error;
            });
            ResourceModel = { findOneAndUpdate: updateMethod };
            ResourceMapper = { toEntity: jest.fn(), toDatabase: jest.fn() };
            repository = new Repository({ ResourceModel, ResourceMapper });
        });

        it('Should call model update', async () => {
            const data = { id: '2' };
            const query = { id: 1 };
            const options = { new: true, upsert: false, runValidators: true };

            try {
                expect(await repository.update(query, data)).toThrowError();
            } catch (err) {
                expect(ResourceModel.findOneAndUpdate).toHaveBeenCalledWith(
                    query,
                    data,
                    options
                );
                expect(updateMethod).toHaveBeenCalled();
                expect(ResourceMapper.toEntity).not.toHaveBeenCalled();
                expect(err).toEqual(error);
            }
        });
    });

    describe('#methods UPDATE ARRAY FIELD ', () => {
        let ResourceModel, ResourceMapper, repository, mockDbResource, mockModelSaveFn;

        beforeEach(() => {
            mockModelSaveFn = jest.fn();
            mockDbResource = {
                arrayField: [],
                save:mockModelSaveFn
            };

            ResourceModel = {
                findOne: jest.fn().mockReturnThis(),
                limit: jest.fn().mockReturnValue(mockDbResource)
            };
            ResourceMapper = { toEntity: jest.fn(), toDatabase: jest.fn() };
            repository = new Repository({ ResourceModel, ResourceMapper });
        });

        it('Should call model update', async () => {
            const arrayField = 'arrayField';
            const query = { id: 1 };
            const arrayValue = 'CONFIRMED';

            await repository.updateArrayField(query, arrayField, arrayValue);

            expect(ResourceModel.findOne).toHaveBeenCalledWith(
                query
            );
            expect(ResourceMapper.toDatabase).not.toHaveBeenCalled();
            expect(mockModelSaveFn).toHaveBeenCalled();
            expect(ResourceMapper.toEntity).toHaveBeenCalledWith(mockDbResource);
        });
    });

    describe('#methods UPDATE ARRAY FIELD FAILL', () => {
        let ResourceModel, ResourceMapper, repository, mockDbResource, mockModelSaveFn;
        const error = new Error('databaseError');

        beforeEach(() => {
            mockModelSaveFn = jest.fn();
            mockDbResource = {
                arrayField: [],
                save:mockModelSaveFn
            };

            ResourceModel = {
                findOne: jest.fn().mockImplementation(() => {
                    throw error;
                }),
                limit: jest.fn().mockReturnValue(mockDbResource)
            };
            ResourceMapper = { toEntity: jest.fn(), toDatabase: jest.fn() };
            repository = new Repository({ ResourceModel, ResourceMapper });
        });

        it('Should call model update', async () => {
            const arrayField = 'arrayField';
            const query = { id: 1 };
            const arrayValue = 'CONFIRMED';

            try {
                expect(await repository.updateArrayField(query, arrayField, arrayValue)).toThrowError();
            } catch (err) {
                expect(ResourceModel.findOne).toHaveBeenCalledWith(
                    query
                );
                expect(mockModelSaveFn).not.toHaveBeenCalled();
                expect(ResourceMapper.toDatabase).not.toHaveBeenCalled();
                expect(ResourceMapper.toEntity).not.toHaveBeenCalled();
                expect(err).toEqual(error);
            }
        });
    });
});
