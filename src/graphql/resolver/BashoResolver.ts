import { Service } from "typedi";
import { GraphQLResolveInfo } from "graphql";
import { Basho } from "../../model/entity/Basho";
import { RikishiResolver } from "./RikishiResolver";
import { BoutResult } from "../../model/valueobject/BoutResult";
import { CreateBashoInput } from "../input/basho/CreateBashoInput";
import { BashoRepository } from "../../db/repository/BashoRepository";
import { Arg, Info, Int, Mutation, Query, Resolver } from "type-graphql";
import { AddBashoWinnerInput } from "../input/basho/AddBashoWinnerInput";
import { BashoMutationResponse } from "../response/mutation/BashoMutationResponse";

@Service()
@Resolver(() => Basho)
export class BashoResolver {

    constructor(
        private rikishiResolver: RikishiResolver,
        private bashoRepository: BashoRepository
    ) {}

    @Query(() => Basho)
    public async basho(@Arg("id", () => Int) id: number, @Info() info: GraphQLResolveInfo): Promise<Basho> {
        return this.bashoRepository.findDetailled(id, info.fieldNodes);
    }

    @Query(() => BoutResult)
    public async boutResult(
        @Arg("bashoId", () => Int) bashoId: number,
        @Arg("rikishiId", () => Int) rikishiId: number,
        @Arg("day", () => Int, { nullable: true }) day?: number
    ): Promise<BoutResult> {
        return this.bashoRepository.findResult(bashoId, rikishiId, day);
    }

    @Mutation(() => BashoMutationResponse)
    public async createBasho(@Arg("basho") basho: CreateBashoInput): Promise<BashoMutationResponse> {
        const response: BashoMutationResponse = new BashoMutationResponse();
        try {
            response.data = await this.bashoRepository.create(basho);
        } catch (e) {
            response.error = (e as Error).message;
        }
        return response;
    }

    @Mutation(() => BashoMutationResponse)
    public async addBashoWinner(@Arg("basho") basho: AddBashoWinnerInput): Promise<BashoMutationResponse> {
        const response: BashoMutationResponse = new BashoMutationResponse();
        try {
            response.data = await this.bashoRepository.update(basho);
        } catch (e) {
            response.error = (e as Error).message;
        }
        return response;
    }
}
