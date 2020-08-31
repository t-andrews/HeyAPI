import { Service } from "typedi";
import { ModelMapper } from "./ModelMapper";
import { RankModel } from "../../model/RankModel";
import { Rank } from "../../../graphql/entity/object/rikishi/Rank";
import { ModelDateFormatter } from "../../util/model/ModelDateFormatter";

@Service()
export class RankModelMapper implements ModelMapper<Rank, RankModel> {

    map(object: Rank): RankModel {
        return {
            division: object.division,
            position: object.position,
            makuuchi_rank: object.makuuchiRank,
            region: object.region,
            start_date: ModelDateFormatter.format(object.startDate),
            end_date: ModelDateFormatter.format(object.endDate!)
        }
    }
}
