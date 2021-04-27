import { Service } from "typedi";
import { Args, FieldResolver, Info, Mutation, Resolver, Root } from "type-graphql";
import { Rank } from "../../model/rikishi/Rank";
import { AddBanzukeInput } from "../input/banzuke/AddBanzukeInput";
import { BanzukeMutationResponse } from "../response/mutation/BanzukeMutationResponse";
import { BanzukeRepository } from "../../db/repository/BanzukeRepository";
import { Banzuke } from "../../model/Banzuke";
import { GraphQLResolveInfo } from "graphql";
import { Basho } from "../../model/Basho";
import { BashoResolver } from "./BashoResolver";
import { RankResolver } from "./RankResolver";
import { RikishiResolver } from "./RikishiResolver";
import { Rikishi } from "../../model/rikishi/Rikishi";
import { CreateRankInput } from "../input/rank/CreateRankInput";

@Service()
@Resolver(() => Banzuke)
export class BanzukeResolver {

    constructor(
        private banzukeRepository: BanzukeRepository,
        private bashoResolver: BashoResolver,
        private rankResolver: RankResolver,
        private rikishiResolver: RikishiResolver
    ) {}

    @FieldResolver()
    public async basho(@Root() source: Banzuke, @Info() info: GraphQLResolveInfo): Promise<Basho> {
        return await this.bashoResolver.basho(source.bashoId, info);
    }

    @FieldResolver()
    public async rank(@Root() source: Banzuke, @Info() info: GraphQLResolveInfo): Promise<Rank> {
        return await this.rankResolver.rank(source.rankId);
    }

    @FieldResolver()
    public async rikishi(@Root() source: Banzuke, @Info() info: GraphQLResolveInfo): Promise<Rikishi> {
        return await this.rikishiResolver.rikishi(source.rikishiId, info);
    }

    @Mutation(() => BanzukeMutationResponse)
    public async addBanzuke(@Args() addBanzukeInput: AddBanzukeInput): Promise<BanzukeMutationResponse> {
        const response: BanzukeMutationResponse = new BanzukeMutationResponse();
        try {
            if (addBanzukeInput.rankId) {
                response.data = await this.banzukeRepository.create(addBanzukeInput);
            } else if (addBanzukeInput.newRank) {
                const newRank: CreateRankInput = addBanzukeInput.newRank;
                addBanzukeInput.newRank = undefined;
                response.data = await this.banzukeRepository.createWithRank(addBanzukeInput, newRank);
            } else {
                response.error = "No rankId or newRank specified.";
            }
        } catch (e) {
            response.error = (e as Error).message;
        }
        return response;
    }
}
