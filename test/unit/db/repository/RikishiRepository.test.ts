import * as sinon from "sinon";
import sinonChai from "sinon-chai";
import chai, { expect } from "chai";
import { cloneDeep } from "lodash";
import { Region } from "../../../../src/constant/Region";
import { Division } from "../../../../src/constant/Division";
import { getTracker, QueryDetails, Tracker } from "mock-knex";
import { Heya } from "../../../../src/model/rikishi/Heya";
import { QueryError } from "../../../../src/graphql/error/QueryError";
import { GraphQLNodeUtil } from "../../../../src/util/GraphQLNodeUtil";
import { Rikishi } from "../../../../src/model/rikishi/Rikishi";
import { RikishiRepository } from "../../../../src/db/repository/RikishiRepository";
import { GenericCRUDRepositoryUtil } from "../../../../src/util/GenericCRUDRepositoryUtil";

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

        it("Should return rikishi on successful creation with heya", async () => {
            const insertedRikishi = <Rikishi> {
                name: "rikishi_name",
                shusshin: "Kyoto",
                birthDate: "2020-01-04T01:10:25+01:00",
                heyaId: 123
            };

            const returnedRikishi = cloneDeep(insertedRikishi);
            returnedRikishi.heya = <Heya> {
                id: insertedRikishi.heyaId,
                creationDate: "1950-01-04T01:10:25+01:00",
                ichimon: "ichimon_test",
                location: "location_test",
                name: "heya_name"
            };
            returnedRikishi.bouts = [];
            returnedRikishi.banzukes = [];

            knexTracker.on('query', (query: QueryDetails, step: number) => {
                [
                    () => {
                        expect(query.sql).to.equal("BEGIN;");
                        query.response({});
                    },
                    () => {
                        expect(query.method).to.equal("select");
                        query.response(returnedRikishi.heya);
                    },
                    () => {
                        console.log('QUERY: ', query);
                        expect(query.method).to.equal("insert");
                        query.response(returnedRikishi);
                    },
                    () => {
                        expect(query.sql).to.equal("COMMIT;");
                        query.response(returnedRikishi);
                    }
                ][step - 1]();
            });

            const result: Rikishi = await repository.create(insertedRikishi);

            expect(result).to.deep.equal(returnedRikishi);
        });

        it("Should return Rikishi on successful detailled find by id with joins", async () => {
            const foundRikishi = <Rikishi> {
                name: "rikishi_name",
                birthDate: "2020-01-04T01:10:25+01:00",
                heya: {
                    id: 123,
                    creationDate: "1950-01-04T01:10:25+01:00",
                    ichimon: "ichimon_test",
                    location: "location_test",
                    name: "heya_name"
                },
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
                        bashoDay: 5,
                        order: 1,
                        duration: 55,
                        winnerId: 1,
                        loserId: 3,
                        bashoId: 1,
                        date: "2020-01-04T01:10:25+01:00"
                    }
                ],
                wins: [
                    {
                        id: 222,
                        bashoDay: 5,
                        order: 1,
                        duration: 55,
                        winnerId: 1,
                        loserId: 3,
                        bashoId: 1,
                        date: "2020-01-04T01:10:25+01:00"
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
                    () => columnNameQuery(query),
                    () => {
                        expect(query.method).to.equal("select");
                        query.response(foundRikishi);
                    }
                ][step - 1]();
            });

            foundRikishi.bouts = [...foundRikishi.losses!,...foundRikishi.wins!]

            const result: Rikishi = await repository.findDetailled(456, undefined!);

            expect(result).to.deep.equal(foundRikishi);
        });
    });

    describe("Negative scenarios", async () => {
        it("Should throw a QueryError when the heyaId is invalid", async () => {
            const insertedRikishi = <Rikishi> {
                name: "rikishi_name",
                birthDate: "2020-01-04T01:10:25+01:00",
                heyaId: 123
            };

            knexTracker.on('query', (query: QueryDetails, step: number) => {
                [
                    () => {
                        expect(query.sql).to.equal("BEGIN;");
                        query.response({});
                    },
                    () => {
                        expect(query.method).to.equal("select");
                        query.response(undefined);
                    },
                    () => {
                        expect(query.sql).to.equal("ROLLBACK");
                        query.response({});
                    }
                ][step - 1]();
            });

            await repository.create(insertedRikishi).catch((err: QueryError) => {
                expect(err.message).to.be.equal(`Query Error: No Heya with id "${insertedRikishi.heyaId}" was found`);
            });
        });
    });
});
