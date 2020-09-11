import { Service } from "typedi";
import { Heya } from "../../model/rikishi/Heya";
import { Arg, Int, Query, Resolver } from "type-graphql";
import { HeyaRepository } from "../../db/repository/HeyaRepository";

@Service()
@Resolver(() => Heya)
export class HeyaResolver {

    constructor(private rikishiRepository: HeyaRepository) {}

    @Query(() => Heya)
    public async heya(@Arg("id", () => Int) id: number): Promise<Heya> {
        return await this.rikishiRepository.find(id);
    }
}
