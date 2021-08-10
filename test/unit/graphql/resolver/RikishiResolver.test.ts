import * as sinon from "sinon";
import sinonChai from "sinon-chai";
import { cloneDeep } from "lodash";
import chai, { expect } from "chai";
import { Rikishi } from "../../../../src/model/entity/Rikishi";
import { RikishiResolver } from "../../../../src/graphql/resolver/RikishiResolver";
import { RikishiRepository } from "../../../../src/db/repository/RikishiRepository";
import { GenericCRUDRepositoryUtil } from "../../../../src/util/GenericCRUDRepositoryUtil";
import { CreateRikishiInput } from "../../../../src/graphql/input/rikishi/CreateRikishiInput";
import { RikishiMutationResponse } from "../../../../src/graphql/response/mutation/RikishiMutationResponse";
import { ShikonaResolver } from "../../../../src/graphql/resolver/ShikonaResolver";

let sandbox: sinon.SinonSandbox;

chai.use(sinonChai);

let rikishiRepository: RikishiRepository;
let shikonaResolver: ShikonaResolver;

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
            shusshin: "Tokyo",
            birthDate: "2020-01-04"
        };

        const returnedRikishi: Rikishi = <Rikishi><unknown>cloneDeep(insertedRikishi)!;

        before(() => {
            returnedRikishi.bouts = [];
            returnedRikishi.banzukes = [];
            sandbox = sinon.createSandbox();
        });

        it("Should return a RikishiMutationResponse on successful creation", async () => {

            sandbox.stub(rikishiRepository, "create").resolves(returnedRikishi);

            const resolver: RikishiResolver = new RikishiResolver(rikishiRepository, shikonaResolver);

            const result: RikishiMutationResponse = await resolver.createRikishi(insertedRikishi);

            expect(result.data).to.deep.equal(returnedRikishi);
        });

        it("Should return a Rikishi on successful find", async () => {

            sandbox.stub(rikishiRepository, "findDetailed").resolves(returnedRikishi);

            const resolver: RikishiResolver = new RikishiResolver(rikishiRepository, shikonaResolver);

            const result: Rikishi = await resolver.rikishi(123, <any> { fieldNodes: [] });

            expect(result).to.deep.equal(returnedRikishi);
        });
    });

    describe("Negative scenarios", async () => {
        it("Should return a RikishiMutationResponse on failed creation", async () => {
            const insertedRikishi = <CreateRikishiInput> {
                shusshin: "Tokyo",
                birthDate: "2020-01-04"
            };

            const error: Error = new Error("Some repository error");

            sandbox.stub(rikishiRepository, "create").rejects(error);

            const resolver: RikishiResolver = new RikishiResolver(rikishiRepository, shikonaResolver);

            const result: RikishiMutationResponse = await resolver.createRikishi(insertedRikishi);

            expect(result.error).to.deep.equal(error.message);
        });
    });
});
