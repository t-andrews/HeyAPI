import { Service } from "typedi";
import { RowValidator } from "./RowValidator";
import { Bout } from "../../../../graphql/entity/object/Bout";

@Service()
export class BoutRowValidator extends RowValidator<Bout>{

    constructor() {
        super([
            "date",
            "basho_day",
            "basho_id",
            "order",
            "opponent_id_1",
            "opponent_id_2",
            "winner_id",
            "winning_method",
            "duration"
        ]);
    }
}
