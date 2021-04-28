import { Service } from "typedi";
import { Args, FieldResolver, Info, Mutation, Resolver, Root } from "type-graphql";
import { AddBanzukeInput } from "../input/banzuke/AddBanzukeInput";
import { BanzukeMutationResponse, BanzukesMutationResponse } from "../response/mutation/BanzukeMutationResponse";
import { BanzukeRepository } from "../../db/repository/BanzukeRepository";
import { Banzuke } from "../../model/Banzuke";
import { GraphQLResolveInfo } from "graphql";
import { Basho } from "../../model/Basho";
import { BashoResolver } from "./BashoResolver";
import { RikishiResolver } from "./RikishiResolver";
import { Rikishi } from "../../model/rikishi/Rikishi";
import { AddBanzukesInput } from "../input/banzuke/AddBanzukesInput";

@Service()
@Resolver(() => Banzuke)
export class BanzukeResolver {

    constructor(
        private banzukeRepository: BanzukeRepository,
        private bashoResolver: BashoResolver,
        private rikishiResolver: RikishiResolver
    ) {}

    @FieldResolver()
    public async basho(@Root() source: Banzuke, @Info() info: GraphQLResolveInfo): Promise<Basho> {
        return await this.bashoResolver.basho(source.bashoId, info);
    }

    @FieldResolver()
    public async rikishi(@Root() source: Banzuke, @Info() info: GraphQLResolveInfo): Promise<Rikishi> {
        return await this.rikishiResolver.rikishi(source.rikishiId, info);
    }

    @Mutation(() => BanzukeMutationResponse)
    public async addBanzuke(@Args() addBanzukeInput: AddBanzukeInput): Promise<BanzukeMutationResponse> {
        const response: BanzukeMutationResponse = new BanzukeMutationResponse();
        try {
            response.data = await this.banzukeRepository.create(addBanzukeInput);
        } catch (e) {
            response.error = (e as Error).message;
        }
        return response;
    }

    @Mutation(() => BanzukesMutationResponse)
    public async addBanzukes(@Args() addBanzukesInput: AddBanzukesInput): Promise<BanzukesMutationResponse> {
        const response: BanzukesMutationResponse = new BanzukesMutationResponse();
        try {
            response.data = await this.banzukeRepository.createMany(addBanzukesInput.banzukes);
        } catch (e) {
            response.error = (e as Error).message;
        }
        return response;
    }
}
