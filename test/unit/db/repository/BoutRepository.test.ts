import * as sinon from "sinon";
import sinonChai from "sinon-chai";
import chai, { expect } from "chai";
import { ValidationError } from "objection";
import { Bout } from "../../../../src/entity/object/Bout";
import { Kimarite } from "../../../../src/constant/Kimarite";
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
                    bashoDay: 5,
                    order: 1,
                    duration: 55,
                    winnerId: 1,
                    loserId: 3,
                    bashoId: 1,
                    date: "2020-01-04T01:10:25+01:00"
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
                    bashoDay: 5,
                    order: 1,
                    duration: 55,
                    winnerId: 1,
                    loserId: 3,
                    bashoId: 1,
                    date: "2020-01-04T01:10:25+01:00"
                });
            }

            knexTracker.on('query', (query: QueryDetails) =>  {
                expect(query.method).to.equal("select");
                query.response(bouts);
            });

            const result: Bout[] = await repository.findByBashoId(123);

            expect(result.length).to.be.equal(3);
        });

        it("Should return the ids on successful creation of many bouts", async () => {
            const bouts: Bout[] = [];

            for(let i = 0; i < 4; i++) {
                bouts.push(<Bout> {
                    id: i,
                    bashoDay: 5,
                    order: 1,
                    duration: 55,
                    winnerId: 1,
                    winningMethod: Kimarite.KIHONWAZA,
                    loserId: 3,
                    bashoId: 1,
                    date: "2020-01-04T01:10:25+01:00"
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
                    bashoDay: 5,
                    order: 1,
                    duration: 55,
                    loserId: 3,
                    bashoId: 1,
                    date: "2020-01-04T01:10:25+01:00"
            }]);
            } catch (e) {
                expect(e instanceof ValidationError).to.be.true;
                expect((e as ValidationError).message).to.equal("winningMethod: is a required property, winnerId: is a required property")
            }
        });
    });
});
