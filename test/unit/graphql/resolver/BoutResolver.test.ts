import * as sinon from "sinon";
import sinonChai from "sinon-chai";
import { cloneDeep } from "lodash";
import chai, { expect } from "chai";
import { Bout } from "../../../../src/model/entity/Bout";
import { Kimarite } from "../../../../src/constant/kimarite/Kimarite";
import { BoutResolver } from "../../../../src/graphql/resolver/BoutResolver";
import { BoutRepository } from "../../../../src/db/repository/BoutRepository";
import { CreateBoutInput } from "../../../../src/graphql/input/bout/CreateBoutInput";
import { GenericCRUDRepositoryUtil } from "../../../../src/util/GenericCRUDRepositoryUtil";
import { BoutMutationResponse } from "../../../../src/graphql/response/mutation/BoutMutationResponse";

let sandbox: sinon.SinonSandbox;

chai.use(sinonChai);

let boutRepository: BoutRepository;

describe("Bout Resolver",  () => {

    const boutInput: CreateBoutInput = <any> {
        day: 5,
        winnerId: 1,
        winningMethod: Kimarite.WATASHIKOMI,
        loserId: 3,
        bashoId: 1
    };

    before(() => {
        sandbox = sinon.createSandbox();
    });

    beforeEach(() => {
        boutRepository = new BoutRepository(new GenericCRUDRepositoryUtil());
    });

    afterEach(() => {
        sandbox.restore();
    });

    describe("Positive scenarios",  () => {

        before(() => {
            sandbox = sinon.createSandbox();
        });

        it("Should return a BoutMutationResponse on successful creation", async () => {

            const returnedBout: Bout = <Bout> cloneDeep(boutInput);
            returnedBout.id = 12345;

            sandbox.stub(boutRepository, "create").resolves(returnedBout);

            const resolver: BoutResolver = new BoutResolver(undefined!, undefined!, boutRepository);

            const result: BoutMutationResponse = await resolver.createBout(boutInput);

            expect(result.data).to.deep.equal(returnedBout);
        });
    });

    describe("Negative scenarios", async () => {

        it("Should return a BoutMutationResponse on failed creation", async () => {

            const error: Error = new Error("Some repository error");

            sandbox.stub(boutRepository, "create").rejects(error);

            const resolver: BoutResolver = new BoutResolver(undefined!, undefined!, boutRepository);

            const result: BoutMutationResponse = await resolver.createBout(boutInput);

            expect(result.error).to.deep.equal(error.message);
        });
    });
});
