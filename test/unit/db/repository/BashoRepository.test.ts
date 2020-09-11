import * as sinon from "sinon";
import { FieldNode} from "graphql";
import sinonChai from "sinon-chai";
import chai, { expect } from "chai";
import { Basho } from "../../../../src/model/Basho";
import { getTracker, QueryDetails, Tracker } from "mock-knex";
import { GraphQLNodeUtil } from "../../../../src/util/GraphQLNodeUtil";
import { BashoRepository } from "../../../../src/db/repository/BashoRepository";
import { GenericCRUDRepositoryUtil } from "../../../../src/util/GenericCRUDRepositoryUtil";

let sandbox: sinon.SinonSandbox;
let knexTracker: Tracker;

chai.use(sinonChai);

let repository: BashoRepository;

describe("Basho Repository",  () => {

    before(() => {
        knexTracker = getTracker();
        sandbox = sinon.createSandbox();
    });

    beforeEach(() => {
        repository = new BashoRepository(new GenericCRUDRepositoryUtil());
        knexTracker.install();
    });

    afterEach(() => {
        knexTracker.uninstall();
        sandbox.restore();
    });

    describe("Positive scenarios",  () => {

        it("Should return Basho on successful detailled find by id without joins", async () => {
            const basho = <Basho> {
                id: 123,
                startDate: "2020-01-04 01:10:25+01:00",
                winnerId: 123,
                location: "location_test",
                name: "Natsu"
            };

            sandbox.stub(GraphQLNodeUtil, "doesSelectionFieldExist").returns(false);

            knexTracker.on('query', (query: QueryDetails) =>  {
                expect(query.method).to.equal("select");
                query.response([basho]);
            });

            const result: Basho = await repository.findDetailled(123, [<FieldNode>{ name: { value: "" } }]);

            expect(result).to.deep.equal(basho);
        });

        it("Should return Basho on successful detailled find by id with joins", async () => {
            const basho = <Basho> {
                id: 456,
                startDate: "2020-01-04 01:10:25+01:00",
                winnerId: 123,
                location: "location_test",
                name: "Natsu",
                bouts: [{}],
                winner: {}
            };

            const columnNameQuery = (query: QueryDetails) => {
                expect(query.method).to.equal("columnInfo");
                query.response({});
            }

            sandbox.stub(GraphQLNodeUtil, "doesSelectionFieldExist").returns(true);

            knexTracker.on('query', (query: QueryDetails, step: number) => {
                [
                    () => columnNameQuery(query),
                    () => columnNameQuery(query),
                    () => columnNameQuery(query),
                    () => {
                        expect(query.method).to.equal("select");
                        query.response([basho]);
                    }
                ][step - 1]();
            });

            const result: Basho = await repository.findDetailled(456, [<FieldNode> { name: { value: "" } }]);

            expect(result).to.deep.equal(basho);
        });
    });

    describe("Negative scenarios", async () => {

    });
});
