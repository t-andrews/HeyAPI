import * as sinon from "sinon";
import sinonChai from "sinon-chai";
import { cloneDeep } from "lodash";
import chai, { expect } from "chai";
import { Region } from "../../../../src/constant/Region";
import { Division } from "../../../../src/constant/Division";
import { GenericCRUDRepositoryUtil } from "../../../../src/util/GenericCRUDRepositoryUtil";
import { BanzukeRepository } from "../../../../src/db/repository/BanzukeRepository";
import { AddBanzukesInput } from "../../../../src/graphql/input/banzuke/AddBanzukesInput";
import { AddBanzukeInput } from "../../../../src/graphql/input/banzuke/AddBanzukeInput";
import { BanzukeResolver } from "../../../../src/graphql/resolver/BanzukeResolver";
import { Banzuke } from "../../../../src/model/Banzuke";
import { BashoResolver } from "../../../../src/graphql/resolver/BashoResolver";
import { RikishiResolver } from "../../../../src/graphql/resolver/RikishiResolver";
import {
    BanzukeMutationResponse,
    BanzukesMutationResponse
} from "../../../../src/graphql/response/mutation/BanzukeMutationResponse";

let sandbox: sinon.SinonSandbox;

chai.use(sinonChai);

const validBanzukeInput: AddBanzukeInput = {
    rikishiId: 34,
    bashoId: 56,
    weight: 78,
    height: 91,
    rank: `M${1}e`
};

let banzukeRepository: BanzukeRepository;
let bashoResolver: BashoResolver;
let rikishiResolver: RikishiResolver;

describe("Rank Resolver",  () => {

    before(() => {
        sandbox = sinon.createSandbox();
    });

    beforeEach(() => {
        banzukeRepository = new BanzukeRepository(new GenericCRUDRepositoryUtil());
    });

    afterEach(() => {
        sandbox.restore();
    });

    describe("Positive scenarios",  () => {

        before(() => {
            sandbox = sinon.createSandbox();
        });

        it("Should return a BanzukeMutationResponse on successful creation of a single banzuke", async () => {

            sandbox.stub(banzukeRepository, "create").resolves(<Banzuke> validBanzukeInput);

            const resolver: BanzukeResolver = new BanzukeResolver(banzukeRepository, bashoResolver, rikishiResolver);

            const result: BanzukeMutationResponse = await resolver.addBanzuke(validBanzukeInput);

            expect(result.data).to.deep.equal(validBanzukeInput);
        });

        it("Should return a BanzukesMutationResponse on successful creation of multiple banzukes", async () => {

            const addBanzukesInput: AddBanzukesInput = new AddBanzukesInput();
            addBanzukesInput.banzukes = [];
            for(let i = 0; i < 5; i++) {
                addBanzukesInput.banzukes.push(<AddBanzukeInput> {
                    id: i,
                    rikishiId: i,
                    bashoId: i,
                    weight: i,
                    height: i,
                    rank: `Me${i}`
                });
            }

            sandbox.stub(banzukeRepository, "createMany").resolves(<Banzuke[]>addBanzukesInput.banzukes);

            const resolver: BanzukeResolver = new BanzukeResolver(banzukeRepository, bashoResolver, rikishiResolver);

            const result: BanzukesMutationResponse = await resolver.addBanzukes(addBanzukesInput);

            expect(result.data?.length).to.be.equal(addBanzukesInput.banzukes.length);
            expect(result.data).to.deep.equal(addBanzukesInput.banzukes);
        });
    });

    describe("Negative scenarios", async () => {

        it("Should return a RankMutationResponse on failed creation of a single banzuke", async () => {

            const error: Error = new Error("Some repository error");

            sandbox.stub(banzukeRepository, "create").rejects(error);

            const resolver: BanzukeResolver = new BanzukeResolver(banzukeRepository, bashoResolver, rikishiResolver);

            const result: BanzukeMutationResponse = await resolver.addBanzuke(validBanzukeInput);

            expect(result.error).to.deep.equal(error.message);
        });

        it("Should return a RanksMutationResponse on failed creation of multiple banzukes", async () => {
            const addBanzukesInput: AddBanzukesInput = new AddBanzukesInput();
            addBanzukesInput.banzukes = [];
            for(let i = 0; i < 5; i++) {
                addBanzukesInput.banzukes.push(<AddBanzukeInput> {
                    id: i,
                    rikishiId: i,
                    bashoId: i,
                    weight: i,
                    height: i,
                    rank: `Me${i}`
                });
            }

            const error: Error = new Error("Some repository error");

            sandbox.stub(banzukeRepository, "createMany").rejects(error);

            const resolver: BanzukeResolver = new BanzukeResolver(banzukeRepository, bashoResolver, rikishiResolver);

            const result: BanzukesMutationResponse = await resolver.addBanzukes(addBanzukesInput);

            expect(result.error).to.deep.equal(error.message);
        });
    });
});
