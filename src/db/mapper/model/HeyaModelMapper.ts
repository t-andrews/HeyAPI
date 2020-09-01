import { Service } from "typedi";
import { ModelMapper } from "./ModelMapper";
import { HeyaModel } from "../../model/HeyaModel";
import { Heya } from "../../../graphql/entity/object/rikishi/Heya";
import { ModelDateFormatter } from "../../util/model/ModelDateFormatter";

@Service()
export class HeyaModelMapper implements ModelMapper<Heya, HeyaModel> {

    public map(object: Heya): HeyaModel {
        return {
            heya_name: object.name,
            ichimon: object.ichimon,
            creation_date: ModelDateFormatter.format(object.creationDate),
            heya_location: object.location
        }
    }
}
