import * as sinon from "sinon";
import sinonChai from "sinon-chai";
import { cloneDeep } from "lodash";
import chai, { expect } from "chai";
import { Heya } from "../../../../src/model/rikishi/Heya";
import { Rikishi } from "../../../../src/model/rikishi/Rikishi";
import { RikishiResolver } from "../../../../src/graphql/resolver/RikishiResolver";
import { RikishiRepository } from "../../../../src/db/repository/RikishiRepository";
import { GenericCRUDRepositoryUtil } from "../../../../src/util/GenericCRUDRepositoryUtil";
import { CreateRikishiInput } from "../../../../src/graphql/input/rikishi/CreateRikishiInput";
import { RikishiMutationResponse } from "../../../../src/graphql/response/mutation/RikishiMutationResponse";

let sandbox: sinon.SinonSandbox;

chai.use(sinonChai);

let rikishiRepository: RikishiRepository;

describe("Rikishi Resolver",  () => {

    before(() => {
        sandbox = sinon.createSandbox();
    });

    beforeEach(() => {
        rikishiRepository = new RikishiRepository(new GenericCRUDRepositoryUtil());
    });

    afterEach(() => {
        sandbox.restore();
    });

    describe("Positive scenarios",  () => {

        const insertedRikishi = <CreateRikishiInput> {
            name: "rikishi_name",
            birthDate: "2020-01-04T01:10:25+01:00",
            heyaId: 123
        };

        const returnedRikishi: Rikishi = <Rikishi> cloneDeep(insertedRikishi)!;

        before(() => {
            returnedRikishi.heya = <Heya> {
                id: insertedRikishi.heyaId,
                creationDate: "1950-01-04T01:10:25+01:00",
                ichimon: "ichimon_test",
                location: "location_test",
                name: "heya_name",
            };
            returnedRikishi.bouts = [];
            returnedRikishi.banzukes = [];
            sandbox = sinon.createSandbox();
        });

        it("Should return a RikishiMutationResponse on successful creation", async () => {

            sandbox.stub(rikishiRepository, "create").resolves(returnedRikishi);

            const resolver: RikishiResolver = new RikishiResolver(rikishiRepository);

            const result: RikishiMutationResponse = await resolver.createRikishi(insertedRikishi);

            expect(result.data).to.deep.equal(returnedRikishi);
        });

        it("Should return a Rikishi on successful find", async () => {

            sandbox.stub(rikishiRepository, "findDetailled").resolves(returnedRikishi);

            const resolver: RikishiResolver = new RikishiResolver(rikishiRepository);

            const result: Rikishi = await resolver.rikishi(123, <any> { fieldNodes: [] });

            expect(result).to.deep.equal(returnedRikishi);
        });
    });

    describe("Negative scenarios", async () => {
        it("Should return a RikishiMutationResponse on failed creation", async () => {
            const insertedRikishi = <CreateRikishiInput> {
                name: "rikishi_name",
                birthDate: "2020-01-04T01:10:25+01:00",
                heyaId: 123
            };

            const error: Error = new Error("Some repository error");

            sandbox.stub(rikishiRepository, "create").rejects(error);

            const resolver: RikishiResolver = new RikishiResolver(rikishiRepository);

            const result: RikishiMutationResponse = await resolver.createRikishi(insertedRikishi);

            expect(result.error).to.deep.equal(error.message);
        });
    });
});
