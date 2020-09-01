import { Service } from "typedi";
import { AbstractRepository } from "./AbstractRepository";
import { RankRowMapper } from "../mapper/row/RankRowMapper";
import { Rank } from "../../graphql/entity/object/rikishi/Rank";
import { RankModelMapper } from "../mapper/model/RankModelMapper";

@Service()
export class RankRepository extends AbstractRepository<Rank> {

    constructor(
        rankModelMapper: RankModelMapper,
        rankRowMapper: RankRowMapper
    ) {
        super("ranks", rankRowMapper, rankModelMapper);
    }

    public async update(id: number, item: Rank): Promise<boolean> {
        return undefined!;
    }

}
