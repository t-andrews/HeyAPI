import { Service } from "typedi";
import { AbstractRowMapper } from "./AbstractRowMapper";
import { Rank } from "../../../graphql/entity/object/rikishi/Rank";
import { RankRowValidator } from "./validator/RankRowValidator";

@Service()
export class RankRowMapper extends AbstractRowMapper<Rank> {

    constructor(
        rowValidator: RankRowValidator
    ) {
        super(rowValidator);
    }

    doMap(row: any): Rank {
        return {
            id: row.rank_id ?? row.id,
            division: row.division,
            position: row.position,
            makuuchiRank: row.makuuchi_rank,
            region: row.region,
            startDate: row.start_date,
            endDate: row.end_date
        };
    }
}
