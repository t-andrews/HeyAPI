import { Arg, Ctx, Info, Query, Resolver } from "type-graphql";
import { Rikishi } from "../../entity/rikishi/Rikishi";
import { Inject, Service } from "typedi";
import { HydrateResolver } from "./HydrateResolver";
import { HeyaRowMapper } from "../../db/mapper/HeyaRowMapper";
import { RankRowMapper } from "../../db/mapper/RankRowMapper";
import { PostgresClient } from "../../db/PostgresClient";
import { GraphQLResolveInfo } from "graphql";
import { GraphQLNodeUtil } from "../../util/GraphQLNodeUtil";
import { QueryBuilder } from "knex";
import { ExecutionContext } from "graphql/execution/execute";

@Service()
@Resolver(of => Rikishi)
export class RikishiResolver implements HydrateResolver<Rikishi> {

    @Inject() private heyaRowMapper!: HeyaRowMapper;
    @Inject() private rankRowMapper!: RankRowMapper;
    @Inject() private postgresClient!: PostgresClient;

    @Query(returns => [Rikishi])
    async rikishi(@Arg("id") id: number, @Ctx() ctx: ExecutionContext, @Info() info: GraphQLResolveInfo): Promise<Rikishi[]> {
        const queryBuilder: QueryBuilder = this.postgresClient.queryTable("rikishi")
            .where({ "rikishi.id": id });

        if(GraphQLNodeUtil.doesSelectionFieldExist(info.fieldNodes, "rikishi", "rank")) {
            queryBuilder.leftJoin("rank", "rank.id", "rikishi.rank_id");
        }

        if(GraphQLNodeUtil.doesSelectionFieldExist(info.fieldNodes, "rikishi", "heya")) {
            queryBuilder.leftJoin("heya", "heya.id", "rikishi.heya_id");
        }

        return this.hydrate(await queryBuilder);
    }

    hydrate(queryResult: any): Rikishi[] {
        return queryResult.map((row: any): Rikishi => ({
            id: row.id,
            name: row.rikishi_name,
            birthDate: row.birth_date,
            heya: this.heyaRowMapper.map(row)!,
            rank: this.rankRowMapper.map(row)!,
        }));
    }
}
