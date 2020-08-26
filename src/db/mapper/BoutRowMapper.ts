import { RowMapper } from "./RowMapper";
import { Inject, Service } from "typedi";
import { Bout } from "../../entity/Bout";
import { RikishiRowMapper } from "./RikishiRowMapper";

@Service()
export class BoutRowMapper implements RowMapper<Bout> {

    @Inject() private rikishiRowMapper!: RikishiRowMapper;

    map(row: any): Bout {
        return {
            id: row.id,
            opponentId1: row.opponent_id_1,
            opponentId2: row.opponent_id_2,
            winnerId: row.winner_id,
            bashoId: row.basho_id,
            basho: undefined!,
            bashoDay: row.basho_day,
            date: row.date,
            duration: row.duration,
            opponents: undefined!,
            order: row.order,
            winner: undefined!,
            winningMethod: row.winning_method
        };
    }
}
