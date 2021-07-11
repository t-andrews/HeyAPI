import * as sinon from "sinon";
import sinonChai from "sinon-chai";
import chai, { expect } from "chai";
import { ValidationError } from "objection";
import { Bout } from "../../../../src/model/entity/Bout";
import { Kimarite } from "../../../../src/constant/kimarite/Kimarite";
import { getTracker, QueryDetails, Tracker } from "mock-knex";
import { BoutRepository } from "../../../../src/db/repository/BoutRepository";
import { GenericCRUDRepositoryUtil } from "../../../../src/util/GenericCRUDRepositoryUtil";

let sandbox: sinon.SinonSandbox;
let knexTracker: Tracker;

chai.use(sinonChai);

let repository: BoutRepository;

describe("Bout Repository",  () => {

    before(() => {
        knexTracker = getTracker();
        sandbox = sinon.createSandbox();
    });

    beforeEach(() => {
        repository = new BoutRepository(new GenericCRUDRepositoryUtil());
        knexTracker.install();
    });

    afterEach(() => {
        knexTracker.uninstall();
        sandbox.restore();
    });

    describe("Positive scenarios",  () => {

        it("Should return bouts on successful find by rikishi id", async () => {
            const bouts: Bout[] = [];

            for(let i = 0; i < 7; i++) {
                bouts.push(<Bout> {
                    id: i,
                    day: 5,
                    winnerId: 1,
                    loserId: 3,
                    bashoId: 1
                });
            }

            knexTracker.on('query', (query: QueryDetails) =>  {
                expect(query.method).to.equal("select");
                query.response(bouts);
            });

            const result: Bout[] = await repository.findByRikishiId(123);

            expect(result.length).to.be.equal(7);
        });

        it("Should return bouts on successful find by basho id", async () => {
            const bouts: Bout[] = [];

            for(let i = 0; i < 3; i++) {
                bouts.push(<Bout> {
                    id: i,
                    day: 5,
                    winnerId: 1,
                    loserId: 3,
                    bashoId: 1
                });
            }

            knexTracker.on('query', (query: QueryDetails) =>  {
                expect(query.method).to.equal("select");
                query.response(bouts);
            });

            const result: Bout[] = await repository.findByBashoId(123);

            expect(result.length).to.be.equal(3);
        });

        it("Should return created bouts on successful creation of many bouts", async () => {
            const bouts: Bout[] = [];

            for(let i = 0; i < 4; i++) {
                bouts.push(<any> {
                    id: i,
                    day: 5,
                    winnerId: 1,
                    winningMethod: Kimarite.HIKIOTOSHI,
                    loserId: 3,
                    bashoId: 1
                });
            }

            knexTracker.on('query', (query: QueryDetails) =>  {
                expect(query.method).to.equal("insert");
                query.response(bouts);
            });

            const result: Bout[] = await repository.createMany(bouts);

            expect(result.length).to.be.equal(4);
        });
    });

    describe("Negative scenarios", async () => {

        it("Should throw an error on creation with a missing field", async () => {

            try {
                await repository.createMany([<Bout> {
                    day: 5,
                    loserId: 3,
                    bashoId: 1
            }]);
            } catch (e) {
                expect(e instanceof ValidationError).to.be.true;
                expect((e as ValidationError).message).to.equal("winningMethod: is a required property, winnerId: is a required property")
            }
        });
    });
});
