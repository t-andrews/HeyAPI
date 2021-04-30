import { Service } from "typedi";
import { GraphQLResolveInfo } from "graphql";
import { Rikishi } from "../../model/Rikishi";
import { Arg, Info, Int, Mutation, Query, Resolver } from "type-graphql";
import { CreateRikishiInput } from "../input/rikishi/CreateRikishiInput";
import { RikishiRepository } from "../../db/repository/RikishiRepository";
import { RikishiMutationResponse } from "../response/mutation/RikishiMutationResponse";

@Service()
@Resolver(() => Rikishi)
export class RikishiResolver {

    constructor(private rikishiRepository: RikishiRepository) {}

    @Query(() => Rikishi)
    public async rikishi(@Arg("id", () => Int) id: number, @Info() info: GraphQLResolveInfo): Promise<Rikishi> {
        return this.rikishiRepository.findDetailled(id, info.fieldNodes);
    }

    @Mutation(() => RikishiMutationResponse)
    public async createRikishi(@Arg("rikishi") rikishi: CreateRikishiInput): Promise<RikishiMutationResponse> {
        const response: RikishiMutationResponse = new RikishiMutationResponse();
        try {
            response.data = await this.rikishiRepository.create(rikishi);
        } catch (e) {
            response.error = (e as Error).message;
        }
        return response;
    }
}
