import { Service } from "typedi";
import { Bout } from "../../model/Bout";
import { Basho } from "../../model/Basho";
import { GraphQLResolveInfo } from "graphql";
import { Rikishi } from "../../model/Rikishi";
import { BashoResolver } from "./BashoResolver";
import { RikishiResolver } from "./RikishiResolver";
import { CreateBoutInput } from "../input/bout/CreateBoutInput";
import { BoutRepository } from "../../db/repository/BoutRepository";
import { BoutMutationResponse } from "../response/mutation/BoutMutationResponse";
import { Arg, FieldResolver, Info, Int, Mutation, Query, Resolver, ResolverInterface, Root } from "type-graphql";

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
        return await this.bashoResolver.basho(source.bashoId, info);
    }

    @FieldResolver()
    public async winner(@Root() source: Bout, @Info() info: GraphQLResolveInfo): Promise<Rikishi> {
        return await this.rikishiResolver.rikishi(source.winnerId, info);
    }

    @FieldResolver()
    public async loser(@Root() source: Bout, @Info() info: GraphQLResolveInfo): Promise<Rikishi> {
        return await this.rikishiResolver.rikishi(source.loserId, info);
    }

    @Query(() => [Bout])
    public async bouts(@Arg("rikishiId", () => Int) id: number): Promise<Bout[]> {
        return await this.boutRepository.findByRikishiId(id);
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
