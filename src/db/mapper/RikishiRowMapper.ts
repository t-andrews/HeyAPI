import { RowMapper } from "./RowMapper";
import { Inject, Service } from "typedi";
import { Rikishi } from "../../entity/rikishi/Rikishi";
import { HeyaRowMapper } from "./HeyaRowMapper";
import { RankRowMapper } from "./RankRowMapper";

@Service()
export class RikishiRowMapper implements RowMapper<Rikishi> {

    @Inject() private heyaRowMapper!: HeyaRowMapper;
    @Inject() private rankRowMapper!: RankRowMapper;

    map(row: any): Rikishi {
        if (!row) {
            return <Rikishi> {};
        }

        return {
            heyaId: row.heya_id,
            rankId: row.rank_id,
            id: row.id,
            name: row.rikishi_name,
            birthDate: row.birth_date,
            heya: this.heyaRowMapper.map(row),
            rank: this.rankRowMapper.map(row),
            bouts: row.bouts
        };
    }
}
