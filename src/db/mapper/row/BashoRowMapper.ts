import { Service } from "typedi";
import { AbstractRowMapper } from "./AbstractRowMapper";
import { Basho } from "../../../graphql/entity/object/Basho";
import { BashoRowValidator } from "./validator/BashoRowValidator";

@Service()
export class BashoRowMapper extends AbstractRowMapper<Basho> {

    constructor(
        rowValidator: BashoRowValidator
    ) {
        super(rowValidator);
    }

    protected doMap(row: any): Basho {
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
