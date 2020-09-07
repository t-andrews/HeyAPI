import { Service } from "typedi";
import { Arg, Query, Resolver } from "type-graphql";
import { Heya } from "../../entity/object/rikishi/Heya";
import { HeyaRepository } from "../../db/repository/HeyaRepository";

@Service()
@Resolver(() => Heya)
export class HeyaResolver {

    constructor(private rikishiRepository: HeyaRepository) {}

    @Query(() => Heya)
    public async heya(@Arg("id") id: number): Promise<Heya> {
        return await this.rikishiRepository.find(id);
    }
}
