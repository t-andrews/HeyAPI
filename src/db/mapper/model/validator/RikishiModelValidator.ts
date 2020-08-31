import { Service } from "typedi";
import { ModelValidator } from "./ModelValidator";
import { RikishiModel } from "../../../model/RikishiModel";

@Service()
export class RikishiModelValidator extends ModelValidator<RikishiModel> {
    constructor() {
        super([
            "heya_id",
            "rank_id",
            "rikishi_name",
            "birth_date"
        ]);
    }
}
