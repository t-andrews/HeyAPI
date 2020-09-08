import { Service } from "typedi";
import { GraphQLResolveInfo } from "graphql";
import { Basho } from "../../entity/object/Basho";
import { RikishiResolver } from "./RikishiResolver";
import { CreateBashoInput } from "../input/basho/CreateBashoInput";
import { UpdateBashoInput } from "../input/basho/UpdateBashoInput";
import { BashoRepository } from "../../db/repository/BashoRepository";
import { Arg, Info, Int, Mutation, Query, Resolver } from "type-graphql";
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
        return await this.bashoRepository.findDetailled(id, info.fieldNodes);
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
    public async updateBasho(@Arg("basho") basho: UpdateBashoInput): Promise<BashoMutationResponse> {
        const response: BashoMutationResponse = new BashoMutationResponse();
        try {
            response.data = await this.bashoRepository.update(basho);
        } catch (e) {
            response.error = (e as Error).message;
        }
        return response;
    }
}
