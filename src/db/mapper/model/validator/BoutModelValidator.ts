import { Service } from "typedi";
import { ModelValidator } from "./ModelValidator";
import { BoutModel } from "../../../model/BoutModel";

@Service()
export class BoutModelValidator extends ModelValidator<BoutModel> {
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
