import { Service } from "typedi";
import { RowValidator } from "./RowValidator";
import { Basho } from "../../../../graphql/entity/object/Basho";

@Service()
export class BashoRowValidator extends RowValidator<Basho>{

    constructor() {
        super([
            "basho_name",
            "basho_location",
            "start_date"
        ]);
    }
}
