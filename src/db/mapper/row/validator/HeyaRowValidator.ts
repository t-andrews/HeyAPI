import { Service } from "typedi";
import { RowValidator } from "./RowValidator";
import { Heya } from "../../../../graphql/entity/object/rikishi/Heya";

@Service()
export class HeyaRowValidator extends RowValidator<Heya>{

    constructor() {
        super([
            "heya_name",
            "ichimon",
            "creation_date",
            "heya_location"
        ]);
    }
}
