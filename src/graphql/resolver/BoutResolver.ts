import { Service } from "typedi";
import { GraphQLResolveInfo } from "graphql";
import { BashoResolver } from "./BashoResolver";
import { Bout } from "../../model/entity/Bout";
import { Basho } from "../../model/entity/Basho";
import { RikishiResolver } from "./RikishiResolver";
import { Rikishi } from "../../model/entity/Rikishi";
import { CreateBoutInput } from "../input/bout/CreateBoutInput";
import { BoutRepository } from "../../db/repository/BoutRepository";
import { BoutMutationResponse } from "../response/mutation/BoutMutationResponse";
import { Arg, FieldResolver, Info, Int, Mutation, Query, Resolver, ResolverInterface, Root } from "type-graphql";
import { BoutResult } from "../../model/valueobject/BoutResult";

@Service()
@Resolver(() => Bout)
export class BoutResolver implements ResolverInterface<Bout> {

    constructor(
        private rikishiResolver: RikishiResolver,
        private bashoResolver: BashoResolver,
        private boutRepository: BoutRepository
    ) {}

    @FieldResolver()
    public async basho(@Root() source: Bout, @Info() info: GraphQLResolveInfo): Promise<Basho> {
        return this.bashoResolver.basho(source.bashoId, info);
    }

    @FieldResolver()
    public async winnerBoutResult(@Root() source: Bout, @Info() info: GraphQLResolveInfo): Promise<BoutResult> {
        return this.bashoResolver.boutResult(source.bashoId, source.winnerId, source.day);
    }

    @FieldResolver()
    public async loserBoutResult(@Root() source: Bout, @Info() info: GraphQLResolveInfo): Promise<BoutResult> {
        return this.bashoResolver.boutResult(source.bashoId, source.loserId, source.day);
    }

    @FieldResolver()
    public async winner(@Root() source: Bout, @Info() info: GraphQLResolveInfo): Promise<Rikishi> {
        return this.rikishiResolver.rikishi(source.winnerId, info);
    }

    @FieldResolver()
    public async loser(@Root() source: Bout, @Info() info: GraphQLResolveInfo): Promise<Rikishi> {
        return this.rikishiResolver.rikishi(source.loserId, info);
    }

    @Query(() => [Bout])
    public async bouts(@Arg("rikishiId", () => Int) id: number, @Arg("limit", () => Int, { nullable: true }) limit?: number): Promise<Bout[]> {
        return this.boutRepository.findByRikishiId(id, limit);
    }

    @Mutation(() => BoutMutationResponse)
    public async createBout(@Arg("bout") bout: CreateBoutInput): Promise<BoutMutationResponse> {
        const response: BoutMutationResponse = new BoutMutationResponse();
        try {
            response.data = await this.boutRepository.create(bout as Bout);
        } catch (e) {
            response.error = (e as Error).message;
        }
        return response;
    }
}
