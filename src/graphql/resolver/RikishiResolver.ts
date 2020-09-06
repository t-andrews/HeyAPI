import { Service } from "typedi";
import { GraphQLResolveInfo } from "graphql";
import { Rikishi } from "../../entity/object/rikishi/Rikishi";
import { Arg, Info, Mutation, Query, Resolver } from "type-graphql";
import { CreateRikishiInput } from "../input/basho/CreateRikishiInput";
import { RikishiRepository } from "../../db/repository/RikishiRepository";
import { IdMutationResponse } from "../response/mutation/IdMutationResponse";
import { Rank } from "../../entity/object/rikishi/Rank";

@Service()
@Resolver(() => Rikishi)
export class RikishiResolver {

    constructor(private rikishiRepository: RikishiRepository) {}

    @Query(() => Rikishi)
    public async rikishi(@Arg("id") id: number, @Info() info: GraphQLResolveInfo): Promise<Rikishi> {
        return await this.rikishiRepository.findDetailled(id, info.fieldNodes);
    }

    @Mutation(() => IdMutationResponse)
    public async createRikishi(@Arg("rikishi") rikishi: CreateRikishiInput): Promise<IdMutationResponse> {
        const response: IdMutationResponse = new IdMutationResponse();
        try {
            response.id = await this.rikishiRepository.create(rikishi);
        } catch (e) {
            response.error = (e as Error).message;
        }
        return response;
    }
}
