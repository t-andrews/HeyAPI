import { Service } from "typedi";
import { FieldNode } from "graphql";
import { Repository } from "./Repository";
import { Bout } from "../../model/entity/Bout";
import { Basho } from "../../model/entity/Basho";
import { GraphQLNodeUtil } from "../../util/GraphQLNodeUtil";
import { PartialModelObject, QueryBuilder } from "objection";
import { BoutResult } from "../../model/valueobject/BoutResult";
import { GenericCRUDRepositoryUtil } from "../../util/GenericCRUDRepositoryUtil";

@Service()
export class BashoRepository implements Repository<Basho> {

    constructor(private repositoryUtil: GenericCRUDRepositoryUtil) {}

    public async create(item: PartialModelObject<Basho>): Promise<Basho> {
        return this.repositoryUtil.create(item, Basho.query());
    }

    public async find(id: number): Promise<Basho> {
        return this.repositoryUtil.find(id, Basho.query());
    }

    public async update(item: PartialModelObject<Basho>): Promise<Basho> {
        return this.repositoryUtil.update(item, Basho.query());
    }

    public async delete(id: number): Promise<boolean> {
        return this.repositoryUtil.delete(id, Basho.query());
    }

    public async findDetailled(id: number, fieldNodes: ReadonlyArray<FieldNode>): Promise<Basho> {
        const queryBuilder: QueryBuilder<Basho, Basho> = Basho.query().findById(id);

        const relationsToFetch: string[] = [];

        if(GraphQLNodeUtil.doesSelectionFieldExist(fieldNodes, "bouts")) {
            relationsToFetch.push("bouts");
        }

        if(GraphQLNodeUtil.doesSelectionFieldExist(fieldNodes, "winner")) {
            relationsToFetch.push("winner");
        }

        if (relationsToFetch.length > 0) {
            queryBuilder.withGraphJoined(`[${relationsToFetch.join(",")}]`);
        }

        return queryBuilder;
    }

    public async findResult(bashoId: number, rikishiId: number, day?: number): Promise<BoutResult> {
        const winsQueryBuilder: QueryBuilder<Bout, Bout[]> = Bout.query()
            .where({ bashoId: bashoId, winnerId: rikishiId });
        const lossesQueryBuilder: QueryBuilder<Bout, Bout[]> = Bout.query()
            .where({ bashoId: bashoId, loserId: rikishiId });

        if (day) {
            winsQueryBuilder.andWhere('day', '<', day);
            lossesQueryBuilder.andWhere('day', '<', day);
        }

        const wins = await winsQueryBuilder.resultSize();
        const losses = await lossesQueryBuilder.resultSize();

        return {
            wins,
            losses
        };
    }
}
