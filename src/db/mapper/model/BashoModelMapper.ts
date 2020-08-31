import { Service } from "typedi";
import { ModelMapper } from "./ModelMapper";
import { BashoModel } from "../../model/BashoModel";
import { Basho } from "../../../graphql/entity/object/Basho";
import { ModelDateFormatter } from "../../util/model/ModelDateFormatter";

@Service()
export class BashoModelMapper implements ModelMapper<Basho, BashoModel> {

    map(object: Basho): BashoModel {
        return {
            basho_name: object.name,
            basho_location: object.location,
            winner_id: object.winnerId,
            start_date: ModelDateFormatter.format(object.startDate),
            end_date: ModelDateFormatter.format(object.endDate!)
        }
    }
}
