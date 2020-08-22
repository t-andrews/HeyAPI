import { RowMapper } from "./RowMapper";
import { Heya } from "../../entity/rikishi/Heya";
import { Service } from "typedi";

@Service()
export class HeyaRowMapper implements RowMapper<Heya> {

    map(row: any): Heya {
        return {
            id: row.heya_id,
            name: row.heya_name,
            ichimon: row.ichimon,
            creationDate: row.creation_date,
            location: row.heya_location
        };
    }
}
