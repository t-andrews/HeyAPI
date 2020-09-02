import { Service } from "typedi";
import { GraphQLResolveInfo } from "graphql";
import { Bout } from "../entity/object/Bout";
import { Basho } from "../entity/object/Basho";
import { BashoResolver } from "./BashoResolver";
import { RikishiResolver } from "./RikishiResolver";
import { Rikishi } from "../entity/object/rikishi/Rikishi";
import { BoutRepository } from "../../db/repository/BoutRepository";
import { CreateBoutInput } from "../entity/input/bout/CreateBoutInput";
import { IdMutationResponse } from "../entity/object/response/mutation/IdMutationResponse";
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

    @Mutation(() => IdMutationResponse)
    public async createBout(@Arg("bout") bout: CreateBoutInput): Promise<IdMutationResponse> {
        const response: IdMutationResponse = new IdMutationResponse();
        try {
            response.id = await this.boutRepository.create(bout as Bout);
        } catch (e) {
            response.error = (e as Error).message;
        }
        return response;
    }
}
