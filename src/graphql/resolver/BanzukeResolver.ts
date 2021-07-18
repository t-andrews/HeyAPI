import { Service } from "typedi";
import { GraphQLResolveInfo } from "graphql";
import { BashoResolver } from "./BashoResolver";
import { Basho } from "../../model/entity/Basho";
import { ShikonaResolver } from "./ShikonaResolver";
import { RikishiResolver } from "./RikishiResolver";
import { Banzuke } from "../../model/entity/Banzuke";
import { Rikishi } from "../../model/entity/Rikishi";
import { Shikona } from "../../model/entity/Shikona";
import { BoutResult } from "../../model/valueobject/BoutResult";
import { AddBanzukeInput } from "../input/banzuke/AddBanzukeInput";
import { AddBanzukesInput } from "../input/banzuke/AddBanzukesInput";
import { BanzukeRepository } from "../../db/repository/BanzukeRepository";
import { Arg, Args, FieldResolver, Info, Int, Mutation, Query, Resolver, Root } from "type-graphql";
import { BanzukeMutationResponse, BanzukesMutationResponse } from "../response/mutation/BanzukeMutationResponse";

@Service()
@Resolver(() => Banzuke)
export class BanzukeResolver {

    constructor(
        private banzukeRepository: BanzukeRepository,
        private bashoResolver: BashoResolver,
        private rikishiResolver: RikishiResolver,
        private shikonaResolver: ShikonaResolver,
    ) {}

    @Query(() => [Banzuke])
    public async banzukes(@Arg("rikishiId", () => Int) rikishiId: number, @Info() info: GraphQLResolveInfo): Promise<Banzuke[]> {
        return this.banzukeRepository.findByRikishiId(rikishiId);
    }

    @FieldResolver()
    public async basho(@Root() source: Banzuke, @Info() info: GraphQLResolveInfo): Promise<Basho> {
        return this.bashoResolver.basho(source.bashoId, info);
    }

    @FieldResolver()
    public async rikishi(@Root() source: Banzuke, @Info() info: GraphQLResolveInfo): Promise<Rikishi> {
        return this.rikishiResolver.rikishi(source.rikishiId, info);
    }

    @FieldResolver()
    public async bashoResult(@Root() source: Banzuke): Promise<BoutResult> {
        return this.bashoResolver.boutResult(source.bashoId, source.rikishiId);
    }

    @FieldResolver()
    public async shikona(@Root() source: Banzuke): Promise<Shikona> {
        return this.shikonaResolver.shikona(source.shikonaId);
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
