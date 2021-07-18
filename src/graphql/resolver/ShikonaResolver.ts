import { Service } from "typedi";
import { GraphQLResolveInfo } from "graphql";
import { Rikishi } from "../../model/entity/Rikishi";
import { Shikona } from "../../model/entity/Shikona";
import { RikishiResolver } from "./RikishiResolver";
import { AddShikonaInput } from "../input/shikona/AddShikonaInput";
import { ShikonaRepository } from "../../db/repository/ShikonaRepository";
import { ShikonaMutationResponse } from "../response/mutation/ShikonaMutationResponse";
import { Arg, Args, FieldResolver, Info, Int, Mutation, Query, Resolver, Root } from "type-graphql";

@Service()
@Resolver(() => Shikona)
export class ShikonaResolver {

    constructor(
        private shikonaRepository: ShikonaRepository,
        private rikishiResolver: RikishiResolver
    ) {}

    @Query(() => Shikona)
    public async shikona(@Arg("shikonaId", () => Int) id: number): Promise<Shikona> {
        return this.shikonaRepository.find(id);
    }

    @Query(() => [Shikona])
    public async shikonaByRikishiId(@Arg("rikishiId", () => Int) id: number, @Info() info: GraphQLResolveInfo): Promise<Shikona[]> {
        return this.shikonaRepository.findByRikishiId(id);
    }

    @Query(() => Shikona)
    public async currentShikona(@Arg("rikishiId", () => Int) rikishiId: number): Promise<Shikona> {
        return this.shikonaRepository.findCurrentShikona(rikishiId);
    }

    @FieldResolver()
    public async rikishi(@Root() source: Shikona, @Info() info: GraphQLResolveInfo): Promise<Rikishi> {
        return this.rikishiResolver.rikishi(source.rikishiId, info);
    }

    @Mutation(() => ShikonaMutationResponse)
    public async addBanzuke(@Args() addShikonaInput: AddShikonaInput): Promise<ShikonaMutationResponse> {
        const response: ShikonaMutationResponse = new ShikonaMutationResponse();
        try {
            response.data = await this.shikonaRepository.create(addShikonaInput);
        } catch (e) {
            response.error = (e as Error).message;
        }
        return response;
    }
}
