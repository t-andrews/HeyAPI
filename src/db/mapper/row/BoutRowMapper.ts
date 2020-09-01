import { Service } from "typedi";
import { AbstractRowMapper } from "./AbstractRowMapper";
import { Bout } from "../../../graphql/entity/object/Bout";
import { BoutRowValidator } from "./validator/BoutRowValidator";

@Service()
export class BoutRowMapper extends AbstractRowMapper<Bout> {

    constructor(
        rowValidator: BoutRowValidator
    ) {
        super(rowValidator);
    }

    protected doMap(row: any): Bout {
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
