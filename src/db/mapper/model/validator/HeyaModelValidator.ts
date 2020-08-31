import { Service } from "typedi";
import { ModelValidator } from "./ModelValidator";
import { HeyaModel } from "../../../model/HeyaModel";

@Service()
export class HeyaModelValidator extends ModelValidator<HeyaModel> {
    constructor() {
        super([
            "heya_name",
            "ichimon",
            "creation_date",
            "heya_location"
        ]);
    }
}
