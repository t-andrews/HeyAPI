import { Service } from "typedi";
import { AbstractRowMapper } from "./AbstractRowMapper";
import { HeyaRowValidator } from "./validator/HeyaRowValidator";
import { Heya } from "../../../graphql/entity/object/rikishi/Heya";

@Service()
export class HeyaRowMapper extends AbstractRowMapper<Heya> {

    constructor(
        rowValidator: HeyaRowValidator
    ) {
        super(rowValidator);
    }

    doMap(row: any): Heya {
        return {
            id: row.heya_id ?? row.id,
            name: row.heya_name,
            ichimon: row.ichimon,
            creationDate: row.creation_date,
            location: row.heya_location
        };
    }
}
