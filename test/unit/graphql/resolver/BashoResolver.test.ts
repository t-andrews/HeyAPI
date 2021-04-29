import * as sinon from "sinon";
import sinonChai from "sinon-chai";
import { cloneDeep } from "lodash";
import chai, { expect } from "chai";
import { Basho } from "../../../../src/model/Basho";
import { HonBasho } from "../../../../src/constant/HonBasho";
import { BashoResolver } from "../../../../src/graphql/resolver/BashoResolver";
import { BashoRepository } from "../../../../src/db/repository/BashoRepository";
import { UpdateBashoInput } from "../../../../src/graphql/input/basho/UpdateBashoInput";
import { CreateBashoInput } from "../../../../src/graphql/input/basho/CreateBashoInput";
import { GenericCRUDRepositoryUtil } from "../../../../src/util/GenericCRUDRepositoryUtil";
import { BashoMutationResponse } from "../../../../src/graphql/response/mutation/BashoMutationResponse";

let sandbox: sinon.SinonSandbox;

chai.use(sinonChai);

let bashoRepository: BashoRepository;

describe("Basho Resolver",  () => {

    const bashoInput: CreateBashoInput = {
        winnerId: 123,
        location: "location_test",
        basho: "1990.05"
    };

    const updateBashoInput = <UpdateBashoInput> cloneDeep(bashoInput);

    before(() => {
        updateBashoInput.id = 12345;
        sandbox = sinon.createSandbox();
    });

    beforeEach(() => {
        bashoRepository = new BashoRepository(new GenericCRUDRepositoryUtil());
    });

    afterEach(() => {
        sandbox.restore();
    });

    describe("Positive scenarios",  () => {

        const returnedBasho: Basho = <Basho> cloneDeep(bashoInput);

        before(() => {
            returnedBasho.id = 12345;
            sandbox = sinon.createSandbox();
        });

        it("Should return a BashoMutationResponse on successful creation", async () => {

            sandbox.stub(bashoRepository, "create").resolves(returnedBasho);

            const resolver: BashoResolver = new BashoResolver(undefined!, bashoRepository);

            const result: BashoMutationResponse = await resolver.createBasho(bashoInput);

            expect(result.data).to.deep.equal(returnedBasho);
        });

        it("Should return a BashoMutationResponse on successful update", async () => {

            sandbox.stub(bashoRepository, "update").resolves(returnedBasho);

            const resolver: BashoResolver = new BashoResolver(undefined!, bashoRepository);

            const result: BashoMutationResponse = await resolver.updateBasho(updateBashoInput);

            expect(result.data).to.deep.equal(returnedBasho);
        });

        it("Should return a Basho on successful find", async () => {

            sandbox.stub(bashoRepository, "findDetailled").resolves(returnedBasho);

            const resolver: BashoResolver = new BashoResolver(undefined!, bashoRepository);

            const result: Basho = await resolver.basho(123, <any> { fieldNodes: [] });

            expect(result).to.deep.equal(returnedBasho);
        });
    });

    describe("Negative scenarios", async () => {

        it("Should return a BashoMutationResponse on failed creation", async () => {

            const error: Error = new Error("Some repository error");

            sandbox.stub(bashoRepository, "create").rejects(error);

            const resolver: BashoResolver = new BashoResolver(undefined!, bashoRepository);

            const result: BashoMutationResponse = await resolver.createBasho(bashoInput);

            expect(result.error).to.deep.equal(error.message);
        });

        it("Should return a BashoMutationResponse on failed update", async () => {

            const error: Error = new Error("Some repository error");

            sandbox.stub(bashoRepository, "update").rejects(error);

            const resolver: BashoResolver = new BashoResolver(undefined!, bashoRepository);

            const result: BashoMutationResponse = await resolver.updateBasho(updateBashoInput);

            expect(result.error).to.deep.equal(error.message);
        });
    });
});
