import { Arg, Ctx, FieldResolver, Info, Query, Resolver, Root } from "type-graphql";
import { Rikishi } from "../../entity/rikishi/Rikishi";
import { Inject, Service } from "typedi";
import { PostgresClient } from "../../db/PostgresClient";
import { GraphQLResolveInfo } from "graphql";
import { GraphQLNodeUtil } from "../../util/GraphQLNodeUtil";
import { QueryBuilder } from "knex";
import { ExecutionContext } from "graphql/execution/execute";
import { RikishiRowMapper } from "../../db/mapper/RikishiRowMapper";
import { BoutRepository } from "../../db/repository/BoutRepository";
import { Bout } from "../../entity/Bout";

@Service()
@Resolver(of => Rikishi)
export class RikishiResolver {

    @Inject() private rikishiRowMapper!: RikishiRowMapper;
    @Inject() private boutRepository!: BoutRepository;
    @Inject() private postgresClient!: PostgresClient;

    @FieldResolver()
    async bouts(@Root() source: Rikishi): Promise<Bout[]> {
        return await this.boutRepository.findByRikishiId(source.id);
    }

    @Query(returns => Rikishi)
    async rikishi(@Arg("id") id: number, @Ctx() ctx: ExecutionContext, @Info() info: GraphQLResolveInfo): Promise<Rikishi> {
        const queryBuilder: QueryBuilder = this.postgresClient.queryTable("rikishis")
            .where({ "rikishis.id": id });

        if(GraphQLNodeUtil.doesSelectionFieldExist(info.fieldNodes, info.fieldNodes[0].name.value, "rank")) {
            queryBuilder.leftJoin("ranks", "ranks.id", "rikishis.rank_id");
        }

        if(GraphQLNodeUtil.doesSelectionFieldExist(info.fieldNodes, info.fieldNodes[0].name.value, "heya")) {
            queryBuilder.leftJoin("heyas", "heyas.id", "rikishis.heya_id");
        }

        return this.rikishiRowMapper.map((await queryBuilder)[0]);
    }
}
