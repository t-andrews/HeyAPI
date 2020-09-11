import * as sinon from "sinon";
import sinonChai from "sinon-chai";
import chai, { expect } from "chai";
import { Heya } from "../../../../src/model/rikishi/Heya";
import { HeyaResolver } from "../../../../src/graphql/resolver/HeyaResolver";
import { HeyaRepository } from "../../../../src/db/repository/HeyaRepository";
import { GenericCRUDRepositoryUtil } from "../../../../src/util/GenericCRUDRepositoryUtil";

let sandbox: sinon.SinonSandbox;

chai.use(sinonChai);

let heyaRepository: HeyaRepository;

describe("Heya Resolver",  () => {

    before(() => {
        sandbox = sinon.createSandbox();
    });

    beforeEach(() => {
        heyaRepository = new HeyaRepository(new GenericCRUDRepositoryUtil());
    });

    afterEach(() => {
        sandbox.restore();
    });

    describe("Positive scenarios",  () => {

        before(() => {
            sandbox = sinon.createSandbox();
        });

        it("Should return a heya on successful find", async () => {

            const returnedHeya = <Heya> {
                creationDate: "2020-01-04T01:10:25+01:00",
                ichimon: "ichimon_test",
                location: "location_test",
                name: "name_test"
            }

            sandbox.stub(heyaRepository, "find").resolves(returnedHeya);

            const resolver: HeyaResolver = new HeyaResolver(heyaRepository);

            const result: Heya = await resolver.heya(123);

            expect(result).to.deep.equal(returnedHeya);
        });
    });

    describe("Negative scenarios", async () => {

    });
});
