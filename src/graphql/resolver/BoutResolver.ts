import { Service } from "typedi";
import { GraphQLResolveInfo } from "graphql";
import { Bout } from "../entity/object/Bout";
import { Basho } from "../entity/object/Basho";
import { RikishiResolver } from "./RikishiResolver";
import { Rikishi } from "../entity/object/rikishi/Rikishi";
import { ExecutionContext } from "graphql/execution/execute";
import { BoutRepository } from "../../db/repository/BoutRepository";
import { BashoRepository } from "../../db/repository/BashoRepository";
import { CreateBoutInput } from "../entity/input/bout/CreateBoutInput";
import { IdMutationResponse } from "../entity/object/response/mutation/IdMutationResponse";
import { Arg, Ctx, FieldResolver, Info, Mutation, Query, Resolver, ResolverInterface, Root } from "type-graphql";

@Service()
@Resolver(of => Bout)
export class BoutResolver implements ResolverInterface<Bout>{

    constructor(
        private rikishiResolver: RikishiResolver,
        private boutRepository: BoutRepository,
        private bashoRepository: BashoRepository,
    ) {}

    @FieldResolver()
    async basho(@Root() source: Bout): Promise<Basho> {
        return await this.bashoRepository.find(source.bashoId);
    }

    @FieldResolver()
    async winner(@Root() source: Bout, @Ctx() ctx: ExecutionContext, @Info() info: GraphQLResolveInfo): Promise<Rikishi> {
        return await this.rikishiResolver.rikishi(source.winnerId, ctx, info);
    }

    @FieldResolver()
    async opponents(@Root() source: Bout, @Ctx() ctx: ExecutionContext, @Info() info: GraphQLResolveInfo): Promise<Rikishi[]> {
        const opponent1: Rikishi = await this.rikishiResolver.rikishi(source.opponentId1, ctx, info);
        const opponent2: Rikishi = await this.rikishiResolver.rikishi(source.opponentId2, ctx, info);

        return [opponent1, opponent2];
    }

    @Query(returns => [Bout])
    async bouts(@Arg("rikishiId") id: number): Promise<Bout[]> {
        return await this.boutRepository.findByRikishiId(id);
    }

    @Mutation(returns => IdMutationResponse)
    async createBout(@Arg("bout") bout: CreateBoutInput): Promise<IdMutationResponse> {
        const response: IdMutationResponse = new IdMutationResponse();
        try {
            response.id = await this.boutRepository.create(bout as Bout);
        } catch (e) {
            response.error = (e as Error).message;
        }
        return response;
    }
}
