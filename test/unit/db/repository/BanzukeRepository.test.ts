import * as sinon from "sinon";
import sinonChai from "sinon-chai";
import chai, { expect } from "chai";
import { ValidationError } from "objection";
import { getTracker, QueryDetails, Tracker } from "mock-knex";
import { Banzuke } from "../../../../src/model/entity/Banzuke";
import { GenericCRUDRepositoryUtil } from "../../../../src/util/GenericCRUDRepositoryUtil";
import { BanzukeRepository } from "../../../../src/db/repository/BanzukeRepository";

let sandbox: sinon.SinonSandbox;
let knexTracker: Tracker;

chai.use(sinonChai);

let repository: BanzukeRepository;

describe("Banzuke Repository",  () => {

    before(() => {
        knexTracker = getTracker();
        sandbox = sinon.createSandbox();
    });

    beforeEach(() => {
        repository = new BanzukeRepository(new GenericCRUDRepositoryUtil());
        knexTracker.install();
    });

    afterEach(() => {
        knexTracker.uninstall();
        sandbox.restore();
    });

    describe("Positive scenarios",  () => {

        it("Should return banzukes on successful find by rikishi id", async () => {
            const banzukes: Banzuke[] = [];

            for(let i = 0; i < 5; i++) {
                banzukes.push(<Banzuke> {
                    id: i,
                    rikishiId: i,
                    bashoId: i,
                    weight: i,
                    height: i,
                    heya: `Heya${i}`
                });
            }

            knexTracker.on('query', (query: QueryDetails) =>  {
                expect(query.method).to.equal("select");
                query.response(banzukes);
            });

            const result: Banzuke[] = await repository.findByRikishiId(5);

            expect(result.length).to.be.equal(5);
        });

        it("Should return created Banzukes on successful creation", async () => {
            const banzukes: Banzuke[] = [];

            for(let i = 0; i < 5; i++) {
                banzukes.push(<Banzuke> {
                    id: i,
                    rikishiId: i,
                    bashoId: i,
                    weight: i,
                    height: i,
                    rank: `Me${i}`,
                    heya: `Heya${i}`
                });
            }

            knexTracker.on('query', (query: QueryDetails) =>  {
                expect(query.method).to.equal("insert");
                query.response(banzukes);
            });

            const result: Banzuke[] = await repository.createMany(banzukes);

            expect(result.length).to.be.equal(5);
            expect(result[0].rikishiId).to.be.equal(0);
        });
    });

    describe("Negative scenarios", async () => {
        it("Should throw an error on creation with a missing field", async () => {

            try {
                // Missing rank field
                await repository.create({
                    id: 12,
                    rikishiId: 34,
                    bashoId: 56,
                    weight: 78,
                    height: 91,
                    heya: `Some_heya`
                });
            } catch (e) {
                expect(e instanceof ValidationError).to.be.true;
                expect((e as ValidationError).message).to.equal("rank: is a required property")
            }
        });
    });
});
