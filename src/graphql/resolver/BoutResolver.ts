import { Arg, Ctx, FieldResolver, Info, Query, Resolver, Root } from "type-graphql";
import { Inject, Service } from "typedi";
import { PostgresClient } from "../../db/PostgresClient";
import { GraphQLResolveInfo } from "graphql";
import { ExecutionContext } from "graphql/execution/execute";
import { Bout } from "../../entity/Bout";
import { Rikishi } from "../../entity/rikishi/Rikishi";
import { RikishiResolver } from "./RikishiResolver";
import { BoutRepository } from "../../db/repository/BoutRepository";
import { Basho } from "../../entity/Basho";
import { BashoRepository } from "../../db/repository/BashoRepository";

@Service()
@Resolver(of => Bout)
export class BoutResolver {

    @Inject() private rikishiResolver!: RikishiResolver;
    @Inject() private boutRepository!: BoutRepository;
    @Inject() private bashoRepository!: BashoRepository;
    @Inject() private postgresClient!: PostgresClient;

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
        const opponnent1: Rikishi = await this.rikishiResolver.rikishi(source.opponentId1, ctx, info);
        const opponnent2: Rikishi = await this.rikishiResolver.rikishi(source.opponentId2, ctx, info);

        return [opponnent1, opponnent2];
    }

    @Query(returns => [Bout])
    async bouts(@Arg("rikishiId") id: number): Promise<Bout[]> {
        return await this.boutRepository.findByRikishiId(id);
    }
}
