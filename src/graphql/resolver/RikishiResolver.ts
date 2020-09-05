import { Service } from "typedi";
import { GraphQLResolveInfo } from "graphql";
import { Rikishi } from "../../entity/object/rikishi/Rikishi";
import { Arg, Info, Query, Resolver, Root } from "type-graphql";
import { RikishiRepository } from "../../db/repository/RikishiRepository";

@Service()
@Resolver(() => Rikishi)
export class RikishiResolver {

    constructor(
        private rikishiRepository: RikishiRepository
    ) {}

    @Query(() => Rikishi)
    public async rikishi(@Arg("id") id: number, @Info() info: GraphQLResolveInfo): Promise<Rikishi> {
        return await this.rikishiRepository.findDetailled(id, info.fieldNodes);
    }
}
