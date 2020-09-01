import { Service } from "typedi";
import { Bout } from "../entity/object/Bout";
import { GraphQLResolveInfo } from "graphql";
import { Basho } from "../entity/object/Basho";
import { RikishiResolver } from "./RikishiResolver";
import { Rikishi } from "../entity/object/rikishi/Rikishi";
import { ExecutionContext } from "graphql/execution/execute";
import { BoutRepository } from "../../db/repository/BoutRepository";
import { BashoRepository } from "../../db/repository/BashoRepository";
import { CreateBashoInput } from "../entity/input/basho/CreateBashoInput";
import { UpdateBashoInput } from "../entity/input/basho/UpdateBashoInput";
import { IdMutationResponse } from "../entity/object/response/mutation/IdMutationResponse";
import { BooleanMutationResponse } from "../entity/object/response/mutation/BooleanMutationResponse";
import { Arg, Ctx, FieldResolver, Info, Mutation, Resolver, ResolverInterface, Root } from "type-graphql";

@Service()
@Resolver(of => Basho)
export class BashoResolver implements ResolverInterface<Basho> {

    constructor(
        private rikishiResolver: RikishiResolver,
        private boutRepository: BoutRepository,
        private bashoRepository: BashoRepository
    ) {}

    @FieldResolver()
    public async bouts(@Root() source: Basho): Promise<Bout[]> {
        return await this.boutRepository.findByBashoId(source.id);
    }

    @FieldResolver()
    public async winner(@Root() source: Basho, @Ctx() ctx: ExecutionContext, @Info() info: GraphQLResolveInfo): Promise<Rikishi> {
        if (!source.winnerId) {
            return undefined!;
        }
        return await this.rikishiResolver.rikishi(source.winnerId, ctx, info);
    }

    @Mutation(type => IdMutationResponse)
    public async createBasho(@Arg("basho") basho: CreateBashoInput): Promise<IdMutationResponse> {
        const response: IdMutationResponse = new IdMutationResponse();
        try {
            response.id = await this.bashoRepository.create(basho as Basho);
        } catch (e) {
            response.error = (e as Error).message;
        }
        return response;
    }

    @Mutation(returns => BooleanMutationResponse)
    public async updateBasho(
        @Arg("id") id: number,
        @Arg("basho") basho: UpdateBashoInput
    ): Promise<BooleanMutationResponse> {
        const response: BooleanMutationResponse = new BooleanMutationResponse();
        try {
            response.success = await this.bashoRepository.update(id, basho as Basho);
        } catch (e) {
            response.error = (e as Error).message;
            response.success = false;
        }
        return response;
    }
}
