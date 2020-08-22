import { RowMapper } from "./RowMapper";
import { Career } from "../../entity/rikishi/Career";
import { Service } from "typedi";

@Service()
export class CareerRowMapper implements RowMapper<Career> {

    map(row: any): Career {
        return <Career>{};
    }
}
