import { Service } from "typedi";
import { GraphQLResolveInfo } from "graphql";
import { Rikishi } from "../../model/entity/Rikishi";
import { Arg, FieldResolver, Info, Int, Mutation, Query, Resolver, Root } from "type-graphql";
import { CreateRikishiInput } from "../input/rikishi/CreateRikishiInput";
import { RikishiRepository } from "../../db/repository/RikishiRepository";
import { RikishiMutationResponse } from "../response/mutation/RikishiMutationResponse";
import { Shikona } from "../../model/entity/Shikona";
import { ShikonaResolver } from "./ShikonaResolver";

@Service()
@Resolver(() => Rikishi)
export class RikishiResolver {

    constructor(
        private rikishiRepository: RikishiRepository,
        private shikonaResolver: ShikonaResolver,
    ) {}

    @FieldResolver()
    public async currentShikona(@Root() source: Rikishi): Promise<Shikona> {
        return this.shikonaResolver.currentShikona(source.id);
    }

    @Query(() => Rikishi)
    public async rikishi(@Arg("id", () => Int) id: number, @Info() info: GraphQLResolveInfo): Promise<Rikishi> {
        return this.rikishiRepository.findDetailed(id, info.fieldNodes);
    }

    @Query(() => [Rikishi])
    public async rikishiByShikona(@Arg("shikona", () => String) shikona: string, @Info() info: GraphQLResolveInfo): Promise<Rikishi[]> {
        return this.rikishiRepository.findDetailedByShikona(shikona, info.fieldNodes);
    }

    @Mutation(() => RikishiMutationResponse)
    public async createRikishi(@Arg("rikishi") rikishi: CreateRikishiInput): Promise<RikishiMutationResponse> {
        const response: RikishiMutationResponse = new RikishiMutationResponse();
        try {
            response.data = await this.rikishiRepository.create(rikishi, rikishi.shikona);
        } catch (e) {
            response.error = (e as Error).message;
        }
        return response;
    }
}
