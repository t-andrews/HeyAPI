import { Arg, Query, Resolver } from "type-graphql";
import { Rikishi } from "../../entity/rikishi/Rikishi";
import { Inject, Service } from "typedi";
import { HydrateResolver } from "./HydrateResolver";
import { HeyaRowMapper } from "../../db/mapper/HeyaRowMapper";
import { RankRowMapper } from "../../db/mapper/RankRowMapper";
import { CareerRowMapper } from "../../db/mapper/CareerRowMapper";
import { PostgresClient } from "../../db/PostgresClient";

@Service()
@Resolver(of => Rikishi)
export class RikishiResolver implements HydrateResolver<Rikishi> {

    @Inject() private heyaRowMapper!: HeyaRowMapper;
    @Inject() private rankRowMapper!: RankRowMapper;
    @Inject() private careerRowMapper!: CareerRowMapper;
    @Inject() private postgresClient!: PostgresClient;

    @Query(returns => [Rikishi])
    async rikishi(@Arg("id") id: number): Promise<Rikishi[]> {
        const queryResult = await this.postgresClient.queryTable("rikishi")
            .where({ "rikishi.id": id })
            .leftJoin("rank", "rank.id", "rikishi.rank_id")
            .leftJoin("heya", "heya.id", "rikishi.heya_id");

        return this.hydrate(queryResult);
    }

    hydrate(queryResult: any): Rikishi[] {
        return queryResult.map((row: any): Rikishi => ({
            id: row.id,
            name: row.rikishi_name,
            birthDate: row.birth_date,
            heya: this.heyaRowMapper.map(row),
            rank: this.rankRowMapper.map(row),
            //career: this.careerRowMapper.map(row)
        }));
    }
}
