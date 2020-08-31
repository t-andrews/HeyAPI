import { Service } from "typedi";
import { AbstractRepository } from "./AbstractRepository";
import { HeyaRowMapper } from "../mapper/row/HeyaRowMapper";
import { Heya } from "../../graphql/entity/object/rikishi/Heya";
import { HeyaModelMapper } from "../mapper/model/HeyaModelMapper";

@Service()
export class HeyaRepository extends AbstractRepository<Heya> {

    constructor(
        private heyaModelMapper: HeyaModelMapper,
        private heyaRowMapper: HeyaRowMapper
    ) {
        super("heyas", heyaRowMapper, heyaModelMapper);
    }

    public async update(id: number, item: Heya): Promise<boolean> {
        return undefined!;
    }

}
