import { Service } from "typedi";
import { RowValidator } from "./RowValidator";
import { Rank } from "../../../../graphql/entity/object/rikishi/Rank";

@Service()
export class RankRowValidator extends RowValidator<Rank>{

    constructor() {
        super([
            "division",
            "start_date"
        ]);
    }
}
