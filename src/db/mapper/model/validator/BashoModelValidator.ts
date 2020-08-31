import { Service } from "typedi";
import { ModelValidator } from "./ModelValidator";
import { BashoModel } from "../../../model/BashoModel";

@Service()
export class BashoModelValidator extends ModelValidator<BashoModel> {
    constructor() {
        super([
            "basho_name",
            "basho_location",
            "winner_id",
            "start_date",
            "end_date"
        ]);
    }
}
