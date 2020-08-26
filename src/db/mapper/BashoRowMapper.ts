import { RowMapper } from "./RowMapper";
import { Service } from "typedi";
import { Basho } from "../../entity/Basho";

@Service()
export class BashoRowMapper implements RowMapper<Basho> {

    map(row: any): Basho {
        return {
            id: row.id,
            winnerId: row.winner_id,
            bouts: undefined!,
            startDate: row.start_date,
            endDate: row.end_date,
            location: row.basho_location,
            name: row.basho_name,
            winner: undefined!
        };
    }
}
