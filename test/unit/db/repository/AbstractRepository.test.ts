import * as sinon from "sinon";
import sinonChai from "sinon-chai";
import chai, { expect } from "chai";
import { ValidationError } from "objection";
import { Tracker, getTracker, QueryDetails } from "mock-knex";
import { Heya } from "../../../../src/entity/object/rikishi/Heya";
import { Rank } from "../../../../src/entity/object/rikishi/Rank";
import { HeyaRepository } from "../../../../src/db/repository/HeyaRepository";
import { RankRepository } from "../../../../src/db/repository/RankRepository";
import { BoutRepository } from "../../../../src/db/repository/BoutRepository";
import { BashoRepository } from "../../../../src/db/repository/BashoRepository";
import { AbstractRepository } from "../../../../src/db/repository/AbstractRepository";

let sandbox: sinon.SinonSandbox;
let knexTracker: Tracker;

chai.use(sinonChai);

let repository: AbstractRepository<any>;

describe("Abstract Repository", async () => {

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

    describe("Positive scenarios", async () => {

        it("Should return the id on successfull creation", async () => {

            repository = new BashoRepository();

            knexTracker.on('query', (query: QueryDetails) => {
                expect(query.method).to.equal("insert");
                query.response([{ id: 1 }]);
            });

            const result: number = await repository.create({
                startDate: "2020-01-04 01:10:25+01:00",
                winnerId: 123,
                location: "location_test",
                name: "Natsu"
            });

            expect(result).to.equal(1);
        });

        it("Should return a Heya on successfull find", async () => {

            repository = new HeyaRepository();

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

            const result: Heya = await repository.find(123);

            expect(result).to.deep.equal(heya);
        });

        it("Should return true on successfull update", async () => {

            repository = new RankRepository();

            knexTracker.on('query', (query: QueryDetails, step: number) => {
                [
                    function firstQuery() {
                        expect(query.method).to.equal("update");
                        query.response([{id: 1}]);
                    },
                    function secondQuery() {
                        expect(query.method).to.equal("select");
                        query.response([{id: 1}]);
                    }
                ][step - 1]();
            });

            const heya: Partial<Rank> = {
                startDate: "2020-01-04 01:10:25+01:00",
            }

            const result: boolean = await repository.update(123, heya);

            expect(result).to.equal(true);
        });

        it("Should return true on successfull delete", async () => {

            repository = new BoutRepository();

            knexTracker.on('query', (query: QueryDetails) => {
                expect(query.method).to.equal("del");
                query.response([123]);
            });

            const result: boolean = await repository.delete(123);

            expect(result).to.equal(true);
        });
    });

    describe("Negative scenarios", async () => {
        it("Should throw an error on creation with a missing field", async () => {

            repository = new HeyaRepository();

            try {
                await repository.create({
                    ichimon: "ichimon_test",
                    location: "location_test",
                    name: "name_test"
                });
            } catch (e) {
                expect(e instanceof ValidationError).to.be.true;
                expect((e as ValidationError).message).to.equal("creationDate: is a required property")
            }
        });

        it("Should throw an error on update with empty fields", async () => {
            repository = new BoutRepository();

            try {
                await repository.create({});
            } catch (e) {
                expect(e instanceof ValidationError).to.be.true;
                expect((e as ValidationError).message).to.equal(
                    "date: is a required property, " +
                    "bashoDay: is a required property, " +
                    "order: is a required property, " +
                    "winningMethod: is a required property, " +
                    "duration: is a required property, " +
                    "winnerId: is a required property, " +
                    "loserId: is a required property, " +
                    "bashoId: is a required property"
                )
            }
        });
    });
});
