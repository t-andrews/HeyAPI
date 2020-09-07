import { Service } from "typedi";
import { Args, Mutation, Resolver } from "type-graphql";
import { Rank } from "../../entity/object/rikishi/Rank";
import { AddRankInput } from "../input/rank/AddRankInput";
import { RankRepository } from "../../db/repository/RankRepository";
import { RanksCreationResponse } from "../response/mutation/RanksCreationResponse";

@Service()
@Resolver(() => Rank)
export class RankResolver {

    constructor(private rankRepository: RankRepository) {}

    @Mutation(() => RanksCreationResponse)
    public async addRanks(@Args() addRankInput: AddRankInput): Promise<RanksCreationResponse> {
        const response: RanksCreationResponse = new RanksCreationResponse();
        try {
            response.data = await this.rankRepository.createMany(addRankInput.rikishiId, addRankInput.ranks);
        } catch (e) {
            response.error = (e as Error).message;
        }
        return response;
    }
}
