import * as sinon from "sinon";
import sinonChai from "sinon-chai";
import chai, { expect } from "chai";
import { ValidationError } from "objection";
import { Region } from "../../../../src/constant/Region";
import { Division } from "../../../../src/constant/Division";
import { getTracker, QueryDetails, Tracker } from "mock-knex";
import { Rank } from "../../../../src/entity/object/rikishi/Rank";
import { RankRepository } from "../../../../src/db/repository/RankRepository";
import { GenericCRUDRepositoryUtil } from "../../../../src/util/GenericCRUDRepositoryUtil";

let sandbox: sinon.SinonSandbox;
let knexTracker: Tracker;

chai.use(sinonChai);

let repository: RankRepository;

describe("Rank Repository",  () => {

    before(() => {
        knexTracker = getTracker();
        sandbox = sinon.createSandbox();
    });

    beforeEach(() => {
        repository = new RankRepository(new GenericCRUDRepositoryUtil());
        knexTracker.install();
    });

    afterEach(() => {
        knexTracker.uninstall();
        sandbox.restore();
    });

    describe("Positive scenarios",  () => {

        it("Should return ranks on successful find by rikishi id", async () => {
            const ranks: Rank[] = [];

            for(let i = 0; i < 5; i++) {
                ranks.push(<Rank> {
                    id: i,
                    division: Division.JURYO,
                    region: Region.EAST,
                    position: 3,
                    startDate: "2020-01-04 01:10:25+01:00"
                });
            }

            knexTracker.on('query', (query: QueryDetails) =>  {
                expect(query.method).to.equal("select");
                query.response(ranks);
            });

            const result: Rank[] = await repository.findByRikishiId(123);

            expect(result.length).to.be.equal(5);
        });
    });

    describe("Negative scenarios", async () => {
        it("Should throw an error on creation with a missing field", async () => {

            try {
                await repository.create({
                    startDate: "2020-01-04 01:10:25+01:00"
                });
            } catch (e) {
                expect(e instanceof ValidationError).to.be.true;
                expect((e as ValidationError).message).to.equal("division: is a required property")
            }
        });
    });
});
