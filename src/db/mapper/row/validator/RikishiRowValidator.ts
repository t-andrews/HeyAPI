import { Service } from "typedi";
import { RowValidator } from "./RowValidator";
import { Rikishi } from "../../../../graphql/entity/object/rikishi/Rikishi";

@Service()
export class RikishiRowValidator extends RowValidator<Rikishi>{

    constructor() {
        super([
            "heya_id",
            "rank_id",
            "rikishi_name",
            "birth_date"
        ]);
    }
}
