import { Service } from "typedi";
import { GraphQLResolveInfo } from "graphql";
import { Bout } from "../entity/object/Bout";
import { Rikishi } from "../entity/object/rikishi/Rikishi";
import { ExecutionContext } from "graphql/execution/execute";
import { BoutRepository } from "../../db/repository/BoutRepository";
import { RikishiRepository } from "../../db/repository/RikishiRepository";
import { Arg, Ctx, FieldResolver, Info, Query, Resolver, ResolverInterface, Root } from "type-graphql";

@Service()
@Resolver(of => Rikishi)
export class RikishiResolver implements ResolverInterface<Rikishi> {

    constructor(
        private rikishiRepository: RikishiRepository,
        private boutRepository: BoutRepository
    ) {}

    @FieldResolver()
    public async bouts(@Root() source: Rikishi): Promise<Bout[]> {
        return await this.boutRepository.findByRikishiId(source.id);
    }

    @Query(returns => Rikishi)
    public async rikishi(@Arg("id") id: number, @Ctx() ctx: ExecutionContext, @Info() info: GraphQLResolveInfo): Promise<Rikishi> {
        return await this.rikishiRepository.findDetailled(id, info.fieldNodes);
    }
}
