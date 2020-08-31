import { Service } from "typedi";
import { HeyaRowMapper } from "./HeyaRowMapper";
import { RankRowMapper } from "./RankRowMapper";
import { AbstractRowMapper } from "./AbstractRowMapper";
import { RikishiRowValidator } from "./validator/RikishiRowValidator";
import { Rikishi } from "../../../graphql/entity/object/rikishi/Rikishi";

@Service()
export class RikishiRowMapper extends AbstractRowMapper<Rikishi> {

    constructor(
        private heyaRowMapper: HeyaRowMapper,
        private rankRowMapper: RankRowMapper,
        rowValidator: RikishiRowValidator
    ) {
        super(rowValidator);
    }

    protected doMap(row: any): Rikishi {
        return {
            heyaId: row.heya_id,
            rankId: row.rank_id,
            id: row.id,
            name: row.rikishi_name,
            birthDate: row.birth_date,
            heya: this.heyaRowMapper.map(row),
            rank: this.rankRowMapper.map(row),
            bouts: undefined!
        };
    }
}
