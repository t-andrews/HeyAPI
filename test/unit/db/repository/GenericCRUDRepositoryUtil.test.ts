import * as sinon from "sinon";
import sinonChai from "sinon-chai";
import chai, { expect } from "chai";
import { ValidationError } from "objection";
import { Bout } from "../../../../src/entity/object/Bout";
import { Basho } from "../../../../src/entity/object/Basho";
import { Tracker, getTracker, QueryDetails } from "mock-knex";
import { Heya } from "../../../../src/entity/object/rikishi/Heya";
import { Rank } from "../../../../src/entity/object/rikishi/Rank";
import { GenericCRUDRepositoryUtil } from "../../../../src/util/GenericCRUDRepositoryUtil";


let sandbox: sinon.SinonSandbox;
let knexTracker: Tracker;

chai.use(sinonChai);

let repository: GenericCRUDRepositoryUtil;

describe("Generic CRUD Repository Util",  () => {

    before(() => {
        knexTracker = getTracker();
        sandbox = sinon.createSandbox();
    });

    beforeEach(() => {
        knexTracker.install();
    });

    afterEach(() => {
        knexTracker.uninstall();
        sandbox.restore();
    });

    describe("Positive scenarios",  () => {

        it("Should return the id on successful creation", async () => {

            repository = new GenericCRUDRepositoryUtil();

            knexTracker.on('query', (query: QueryDetails) => {
                expect(query.method).to.equal("insert");
                query.response([{ id: 1 }]);
            });

            const result: number = await repository.create<Basho>(
                <Basho> {
                    startDate: "2020-01-04 01:10:25+01:00",
                    winnerId: 123,
                    location: "location_test",
                    name: "Natsu"
                },
                Basho.query()
            );

            expect(result).to.equal(1);
        });

        it("Should return a Heya on successful find", async () => {

            repository = new GenericCRUDRepositoryUtil();

            const heya: Partial<Heya> = {
                creationDate: "2020-01-04 01:10:25+01:00",
                ichimon: "ichimon_test",
                location: "location_test",
                name: "name_test"
            }

            knexTracker.on('query', (query: QueryDetails) =>  {
                expect(query.method).to.equal("select");
                query.response([heya]);
            });

            const result: Heya = await repository.find<Heya>(123, Heya.query());

            expect(result).to.deep.equal(heya);
        });

        it("Should return true on successful update", async () => {

            repository = new GenericCRUDRepositoryUtil();

            knexTracker.on('query', (query: QueryDetails, step: number) => {
                [
                    () => {
                        expect(query.method).to.equal("update");
                        query.response([{id: 123}]);
                    },
                    () => {
                        expect(query.method).to.equal("select");
                        query.response([{id: 123}]);
                    }
                ][step - 1]();
            });

            const rank: Partial<Rank> = {
                id: 123,
                startDate: "2020-01-04 01:10:25+01:00",
            }

            const result: boolean = await repository.update<Rank>(rank, Rank.query());

            expect(result).to.equal(true);
        });

        it("Should return true on successful delete", async () => {

            repository = new GenericCRUDRepositoryUtil();

            knexTracker.on('query', (query: QueryDetails) => {
                expect(query.method).to.equal("del");
                query.response([123]);
            });

            const result: boolean = await repository.delete<Bout>(123, Bout.query());

            expect(result).to.equal(true);
        });
    });

    describe("Negative scenarios", async () => {

        it("Should throw an error on creation with a missing field", async () => {

            repository = new GenericCRUDRepositoryUtil();

            try {
                await repository.create<Heya>(
                    <Heya> {
                        ichimon: "ichimon_test",
                        location: "location_test",
                        name: "name_test"
                    },
                    Heya.query()
                );
            } catch (e) {
                expect(e instanceof ValidationError).to.be.true;
                expect((e as ValidationError).message).to.equal("creationDate: is a required property")
            }
        });

        it("Should throw an error for an invalid update item", async () => {
            repository = new GenericCRUDRepositoryUtil();

            try {
                await repository.update({ id: 1 }, Bout.query());
            } catch (e) {
                expect(e instanceof ValidationError).to.be.true;
                expect((e as ValidationError).message).to.equal("No valid field was supplied for the update")
            }
        });

        it("Should throw an error on creation with an invalid date format", async () => {

            repository = new GenericCRUDRepositoryUtil();

            try {
                await repository.create<Heya>(
                    <Heya> {
                        creationDate: "2020-01-04 01:10:25",
                        ichimon: "ichimon_test",
                        location: "location_test",
                        name: "name_test"
                    },
                    Heya.query()
                );
            } catch (e) {
                expect(e instanceof ValidationError).to.be.true;
                expect((e as ValidationError).message).to.equal("creationDate: should match format \"date-time\"")
            }
        });
    });
});
