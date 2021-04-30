import * as sinon from "sinon";
import sinonChai from "sinon-chai";
import chai, { expect } from "chai";
import { ValidationError } from "objection";
import { Bout } from "../../../src/model/Bout";
import { Basho } from "../../../src/model/Basho";
import { Banzuke } from "../../../src/model/Banzuke";
import { Tracker, getTracker, QueryDetails } from "mock-knex";
import { GenericCRUDRepositoryUtil } from "../../../src/util/GenericCRUDRepositoryUtil";

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

            const result: Basho = await repository.create<Basho>(
                <Basho> {
                    winnerId: 123,
                    basho: "2021.07"
                },
                Basho.query()
            );

            expect(result.id).to.equal(1);
        });

        it("Should return a Banzuke on successful find", async () => {

            repository = new GenericCRUDRepositoryUtil();

            const heya: Partial<Banzuke> = {
                id: 123,
                rank: "Y1e"
            }

            knexTracker.on('query', (query: QueryDetails) =>  {
                expect(query.method).to.equal("select");
                query.response([heya]);
            });

            const result: Banzuke = await repository.find<Banzuke>(123, Banzuke.query());

            expect(result).to.deep.equal(heya);
        });

        it("Should return the updated item on successful update", async () => {

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

            const rank: Partial<Banzuke> = {
                id: 123,
                rank: "Y1e"
            }

            const result: Banzuke = await repository.update<Banzuke>(rank, Banzuke.query());

            expect(result).to.deep.equal(rank);
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
                await repository.create<Banzuke>(
                    <Banzuke> {
                        id: 12,
                        bashoId: 34,
                        weight: 100,
                        height: 179,
                        rank: "Y1e",
                        heya: "Some_heya"
                    },
                    Banzuke.query()
                );
            } catch (e) {
                expect(e instanceof ValidationError).to.be.true;
                expect((e as ValidationError).message).to.equal("rikishiId: is a required property")
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
    });
});
