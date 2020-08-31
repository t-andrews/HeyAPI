import { Service } from "typedi";
import { ModelMapper } from "./ModelMapper";
import { BoutModel } from "../../model/BoutModel";
import { Bout } from "../../../graphql/entity/object/Bout";
import { ModelDateFormatter } from "../../util/model/ModelDateFormatter";

@Service()
export class BoutModelMapper implements ModelMapper<Bout, BoutModel> {

    map(object: Bout): BoutModel {
        return {
            date: ModelDateFormatter.format(object.date),
            basho_day: object.bashoDay,
            order: object.order,
            basho_id: object.bashoId,
            opponent_id_1: object.opponentId1,
            opponent_id_2: object.opponentId2,
            winner_id: object.winnerId,
            winning_method: object.winningMethod,
            duration: object.duration
        }
    }
}
