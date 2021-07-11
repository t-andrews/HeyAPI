import * as sinon from "sinon";
import { cloneDeep } from "lodash";
import sinonChai from "sinon-chai";
import chai, { expect } from "chai";
import { Rikishi } from "../../../../src/model/entity/Rikishi";
import { getTracker, QueryDetails, Tracker } from "mock-knex";
import { GraphQLNodeUtil } from "../../../../src/util/GraphQLNodeUtil";
import { RikishiRepository } from "../../../../src/db/repository/RikishiRepository";
import { GenericCRUDRepositoryUtil } from "../../../../src/util/GenericCRUDRepositoryUtil";
import { Shikona } from "../../../../src/model/entity/Shikona";

let sandbox: sinon.SinonSandbox;
let knexTracker: Tracker;

chai.use(sinonChai);

let repository: RikishiRepository;

describe("Rikishi Repository",  () => {

    before(() => {
        knexTracker = getTracker();
        sandbox = sinon.createSandbox();
    });

    beforeEach(() => {
        repository = new RikishiRepository(new GenericCRUDRepositoryUtil());
        knexTracker.install();
    });

    afterEach(() => {
        knexTracker.uninstall();
        sandbox.restore();
    });

    describe("Positive scenarios",  () => {

        it("Should return rikishi on successful creation", async () => {
            const insertedRikishi = <Rikishi> {
                id: 123,
                shusshin: "Kyoto",
                birthDate: "2020-01-04"
            };

            const returnedRikishi = cloneDeep(insertedRikishi);
            returnedRikishi.shikonas = [];
            returnedRikishi.bouts = [];
            returnedRikishi.banzukes = [];

            knexTracker.on('query', (query: QueryDetails, step: number) => {
                [
                    () => {
                        expect(query.sql).to.equal("BEGIN;");
                        query.response({});
                    },
                    () => {
                        expect(query.method).to.equal("insert");
                        query.response([returnedRikishi]);
                    },
                    () => {
                        expect(query.sql).to.equal("COMMIT;");
                        query.response({});
                    }
                ][step - 1]();
            });

            const result: Rikishi = await repository.create(insertedRikishi);

            expect(result).to.deep.equal(returnedRikishi);
        });

        it("Should return rikishi on successful creation with shikona", async () => {
            const insertedRikishi = <Rikishi> {
                id: 123,
                shusshin: "Kyoto",
                birthDate: "2020-01-04"
            };

            const returnedShikona = <Shikona>{id: 1, rikishiId: 123, shikona: "some_shikona"};

            const returnedRikishi = cloneDeep(insertedRikishi);
            returnedRikishi.shikonas = [returnedShikona];
            returnedRikishi.bouts = [];
            returnedRikishi.banzukes = [];


            knexTracker.on('query', (query: QueryDetails, step: number) => {
                [
                    () => {
                        expect(query.sql).to.equal("BEGIN;");
                        query.response({});
                    },
                    () => {
                        expect(query.method).to.equal("insert");
                        query.response([returnedRikishi]);
                    },
                    () => {
                        expect(query.method).to.equal("insert");
                        query.response([returnedShikona]);
                    },
                    () => {
                        expect(query.sql).to.equal("COMMIT;");
                        query.response({});
                    }
                ][step - 1]();
            });

            const result: Rikishi = await repository.create(insertedRikishi, returnedShikona.shikona);

            expect(result).to.deep.equal(returnedRikishi);
        });

        it("Should return Rikishi on successful detailed find by id without joins", async () => {
            const foundRikishi = <Rikishi><unknown>{
                birthDate: "2020-01-04",
                id: 123,
                shusshin: "Kyoto",
                shikonas: [],
                banzukes: [],
                losses: [],
                wins: [],
                bouts: []
            };

            sandbox.stub(GraphQLNodeUtil, "doesSelectionFieldExist")
                .onCall(0).returns(false)
                .onCall(1).returns(false)
                .onCall(2).returns(false)
                .onCall(3).returns(false)
                .onCall(4).returns(false);

            knexTracker.on('query', (query: QueryDetails, step: number) => {
                [
                    () => {
                        expect(query.method).to.equal("select");
                        query.response(foundRikishi);
                    }
                ][step - 1]();
            });

            const result: Rikishi = await repository.findDetailed(456, undefined!);

            expect(result).to.deep.equal(foundRikishi);
        });

        it("Should return Rikishi on successful detailed find by id with joins", async () => {
            const foundRikishi = <Rikishi> {
                birthDate: "2020-01-04",
                id: 123,
                shusshin: "Kyoto",
                shikonas: [{}],
                banzukes: [
                    {
                        id: 222,
                        rikishiId: 123,
                        bashoId: 456,
                        weight: 155,
                        height: 179
                    }
                ],
                losses: [
                    {
                        id: 111,
                        day: 5,
                        winnerId: 1,
                        loserId: 3,
                        bashoId: 1
                    }
                ],
                wins: [
                    {
                        id: 222,
                        day: 5,
                        winnerId: 1,
                        loserId: 3,
                        bashoId: 1
                    }
                ]
            };

            const columnNameQuery = (query: QueryDetails) => {
                expect(query.method).to.equal("columnInfo");
                query.response({});
            }

            sandbox.stub(GraphQLNodeUtil, "doesSelectionFieldExist")
                .onCall(0).returns(true)
                .onCall(1).returns(true)
                .onCall(2).returns(true)
                .onCall(3).returns(false)
                .onCall(4).returns(false);

            knexTracker.on('query', (query: QueryDetails, step: number) => {
                [
                    () => columnNameQuery(query),
                    () => {
                        expect(query.method).to.equal("columnInfo");
                        query.response({});
                    },
                    () => {
                        expect(query.method).to.equal("select");
                        query.response(foundRikishi);
                    }
                ][step - 1]();
            });

            foundRikishi.bouts = [...foundRikishi.losses!,...foundRikishi.wins!]

            const result: Rikishi = await repository.findDetailed(456, undefined!);

            expect(result).to.deep.equal(foundRikishi);
        });
    });

    describe("Negative scenarios", async () => {
        // it("Should throw a QueryError when the heyaId is invalid", async () => {
        //     const insertedRikishi = <Rikishi> {
        //         name: "rikishi_name",
        //         birthDate: "2020-01-04T01:10:25+01:00",
        //         heya: "Some_heya"
        //     };
        //
        //     knexTracker.on('query', (query: QueryDetails, step: number) => {
        //         [
        //             () => {
        //                 expect(query.sql).to.equal("BEGIN;");
        //                 query.response({});
        //             },
        //             () => {
        //                 expect(query.method).to.equal("select");
        //                 query.response(undefined);
        //             },
        //             () => {
        //                 expect(query.sql).to.equal("ROLLBACK");
        //                 query.response({});
        //             }
        //         ][step - 1]();
        //     });
        //
        //     await repository.create(insertedRikishi).catch((err: QueryError) => {
        //         expect(err.message).to.be.equal(`Query Error: No Heya with id "${insertedRikishi.heyaId}" was found`);
        //     });
        // });
    });
});
