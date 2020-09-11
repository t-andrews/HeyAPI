import { Service } from "typedi";
import { Args, Mutation, Resolver } from "type-graphql";
import { Rank } from "../../model/rikishi/Rank";
import { AddRankInput } from "../input/rank/AddRankInput";
import { RankRepository } from "../../db/repository/RankRepository";
import { RanksMutationResponse } from "../response/mutation/RanksMutationResponse";

@Service()
@Resolver(() => Rank)
export class RankResolver {

    constructor(private rankRepository: RankRepository) {}

    @Mutation(() => RanksMutationResponse)
    public async addRanks(@Args() addRankInput: AddRankInput): Promise<RanksMutationResponse> {
        const response: RanksMutationResponse = new RanksMutationResponse();
        try {
            response.data = await this.rankRepository.createMany(addRankInput.rikishiId, addRankInput.ranks);
        } catch (e) {
            response.error = (e as Error).message;
        }
        return response;
    }
}
