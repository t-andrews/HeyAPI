import * as sinon from "sinon";
import sinonChai from "sinon-chai";
import { cloneDeep } from "lodash";
import chai, { expect } from "chai";
import { Region } from "../../../../src/constant/Region";
import { Division } from "../../../../src/constant/Division";
import { Rank } from "../../../../src/entity/object/rikishi/Rank";
import { RankResolver } from "../../../../src/graphql/resolver/RankResolver";
import { RankRepository } from "../../../../src/db/repository/RankRepository";
import { AddRankInput } from "../../../../src/graphql/input/rank/AddRankInput";
import { CreateRankInput } from "../../../../src/graphql/input/rank/CreateRankInput";
import { GenericCRUDRepositoryUtil } from "../../../../src/util/GenericCRUDRepositoryUtil";
import { RanksCreationResponse } from "../../../../src/graphql/response/mutation/RanksCreationResponse";

let sandbox: sinon.SinonSandbox;

chai.use(sinonChai);

let rankRepository: RankRepository;

describe("Rank Resolver",  () => {

    before(() => {
        sandbox = sinon.createSandbox();
    });

    beforeEach(() => {
        rankRepository = new RankRepository(new GenericCRUDRepositoryUtil());
    });

    afterEach(() => {
        sandbox.restore();
    });

    describe("Positive scenarios",  () => {

        before(() => {
            sandbox = sinon.createSandbox();
        });

        it("Should return a RanksCreationResponse on successful creation of many ranks", async () => {

            const ranks: CreateRankInput[] = [];

            for(let i = 0; i < 5; i++) {
                ranks.push(<CreateRankInput> {
                    division: Division.JURYO,
                    region: Region.EAST,
                    position: 3,
                    startDate: "2020-01-04T01:10:25+01:00"
                });
            }

            const insertedRanks: AddRankInput = {
                rikishiId: 123,
                ranks: ranks
            };

            const returnedRanks: Rank[] = (<Rank[]> cloneDeep(insertedRanks).ranks).map(r => {
                r.rikishiId = insertedRanks.rikishiId
                return r;
            });

            sandbox.stub(rankRepository, "createMany").resolves(returnedRanks);

            const resolver: RankResolver = new RankResolver(rankRepository);

            const result: RanksCreationResponse = await resolver.addRanks(insertedRanks);

            expect(result.data?.length).to.be.equal(ranks.length);
            expect(result.data).to.deep.equal(returnedRanks);
        });
    });

    describe("Negative scenarios", async () => {
        it("Should return a RanksCreationResponse on failed creation", async () => {
            const insertedRanks: AddRankInput = {
                rikishiId: 123,
                ranks: []
            };

            const error: Error = new Error("Some repository error");

            sandbox.stub(rankRepository, "createMany").rejects(error);

            const resolver: RankResolver = new RankResolver(rankRepository);

            const result: RanksCreationResponse = await resolver.addRanks(insertedRanks);

            expect(result.error).to.deep.equal(error.message);
        });
    });
});
