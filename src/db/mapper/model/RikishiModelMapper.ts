import { Service } from "typedi";
import { ModelMapper } from "./ModelMapper";
import { RikishiModel } from "../../model/RikishiModel";
import { Rikishi } from "../../../graphql/entity/object/rikishi/Rikishi";
import { ModelDateFormatter } from "../../util/model/ModelDateFormatter";

@Service()
export class RikishiModelMapper implements ModelMapper<Rikishi, RikishiModel> {

    public map(object: Rikishi): RikishiModel {
        return {
            heya_id: object.heyaId,
            rank_id: object.rankId,
            rikishi_name: object.name,
            birth_date: ModelDateFormatter.format(object.birthDate)
        };
    }
}
