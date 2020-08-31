import { Service } from "typedi";
import { ModelValidator } from "./ModelValidator";
import { RankModel } from "../../../model/RankModel";

@Service()
export class RankModelValidator extends ModelValidator<RankModel> {
    constructor() {
        super([
            "division",
            "position",
            "makuuchi_rank",
            "region",
            "start_date",
            "end_date",
        ]);
    }
}
