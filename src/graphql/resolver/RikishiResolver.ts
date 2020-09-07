import { Service } from "typedi";
import { GraphQLResolveInfo } from "graphql";
import { Rikishi } from "../../entity/object/rikishi/Rikishi";
import { Arg, Info, Mutation, Query, Resolver } from "type-graphql";
import { CreateRikishiInput } from "../input/rikishi/CreateRikishiInput";
import { RikishiRepository } from "../../db/repository/RikishiRepository";
import { RikishiCreationResponse } from "../response/mutation/RikishiCreationResponse";

@Service()
@Resolver(() => Rikishi)
export class RikishiResolver {

    constructor(private rikishiRepository: RikishiRepository) {}

    @Query(() => Rikishi)
    public async rikishi(@Arg("id") id: number, @Info() info: GraphQLResolveInfo): Promise<Rikishi> {
        return await this.rikishiRepository.findDetailled(id, info.fieldNodes);
    }

    @Mutation(() => RikishiCreationResponse)
    public async createRikishi(@Arg("rikishi") rikishi: CreateRikishiInput): Promise<RikishiCreationResponse> {
        const response: RikishiCreationResponse = new RikishiCreationResponse();
        try {
            response.data = await this.rikishiRepository.create(rikishi);
        } catch (e) {
            response.error = (e as Error).message;
        }
        return response;
    }
}
