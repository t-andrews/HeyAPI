import { Service } from "typedi";
import { GraphQLResolveInfo } from "graphql";
import { Bout } from "../../entity/object/Bout";
import { BashoResolver } from "./BashoResolver";
import { Basho } from "../../entity/object/Basho";
import { RikishiResolver } from "./RikishiResolver";
import { Rikishi } from "../../entity/object/rikishi/Rikishi";
import { CreateBoutInput } from "../input/bout/CreateBoutInput";
import { BoutRepository } from "../../db/repository/BoutRepository";
import { BoutCreationResponse } from "../response/mutation/BoutCreationResponse";
import { Arg, FieldResolver, Info, Mutation, Query, Resolver, ResolverInterface, Root } from "type-graphql";

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
    public async bouts(@Arg("rikishiId") id: number): Promise<Bout[]> {
        return await this.boutRepository.findByRikishiId(id);
    }

    @Mutation(() => BoutCreationResponse)
    public async createBout(@Arg("bout") bout: CreateBoutInput): Promise<BoutCreationResponse> {
        const response: BoutCreationResponse = new BoutCreationResponse();
        try {
            response.data = await this.boutRepository.create(bout as Bout);
        } catch (e) {
            response.error = (e as Error).message;
        }
        return response;
    }
}
