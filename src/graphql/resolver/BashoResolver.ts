import { Arg, Ctx, FieldResolver, Info, Query, Resolver, Root } from "type-graphql";
import { Inject, Service } from "typedi";
import { Bout } from "../../entity/Bout";
import { BoutRepository } from "../../db/repository/BoutRepository";
import { Basho } from "../../entity/Basho";
import { ExecutionContext } from "graphql/execution/execute";
import { GraphQLResolveInfo } from "graphql";
import { Rikishi } from "../../entity/rikishi/Rikishi";
import { RikishiResolver } from "./RikishiResolver";

@Service()
@Resolver(of => Basho)
export class BashoResolver {

    @Inject() private rikishiResolver!: RikishiResolver;
    @Inject() private boutRepository!: BoutRepository;

    @FieldResolver()
    async bouts(@Root() source: Basho): Promise<Bout[]> {
        return await this.boutRepository.findByBashoId(source.id);
    }

    @FieldResolver()
    async winner(@Root() source: Basho, @Ctx() ctx: ExecutionContext, @Info() info: GraphQLResolveInfo): Promise<Rikishi> {
        if (!source.winnerId) {
            return undefined!;
        }
        return await this.rikishiResolver.rikishi(source.winnerId, ctx, info);
    }
}
