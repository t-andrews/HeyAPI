import { RowMapper } from "./RowMapper";
import { Rank } from "../../entity/rikishi/Rank";
import { Service } from "typedi";

@Service()
export class RankRowMapper implements RowMapper<Rank> {

    map(row: any): Rank {
        return row.division && row.start_date ? {
                id: row.rank_id ?? row.id,
                division: row.division,
                position: row.position,
                makuuchiRank: row.makuuchi_rank,
                region: row.region,
                startDate: row.start_date,
                endDate: row.end_date
            }
            : undefined!;
    }
}
