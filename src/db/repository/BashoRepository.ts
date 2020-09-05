import { Service } from "typedi";
import { FieldNode } from "graphql";
import { Repository } from "./Repository";
import { Basho } from "../../entity/object/Basho";
import { GraphQLNodeUtil } from "../../util/GraphQLNodeUtil";
import { PartialModelObject, QueryBuilder } from "objection";
import { GenericCRUDRepositoryUtil } from "../../util/GenericCRUDRepositoryUtil";

@Service()
export class BashoRepository implements Repository<Basho> {

    constructor(private repositoryUtil: GenericCRUDRepositoryUtil) {}

    public async create(item: PartialModelObject<Basho>): Promise<number> {
        return await this.repositoryUtil.create(item, Basho.query())
    }

    public async find(id: number): Promise<Basho> {
        return await this.repositoryUtil.find(id, Basho.query())
    }

    public async update(item: PartialModelObject<Basho>): Promise<boolean> {
        return await this.repositoryUtil.update(item, Basho.query())
    }

    public async delete(id: number): Promise<boolean> {
        return await this.repositoryUtil.delete(id, Basho.query())
    }

    public async findDetailled(id: number, fieldNodes: ReadonlyArray<FieldNode>): Promise<Basho> {
        const queryBuilder: QueryBuilder<Basho> = Basho.query().where({ "bashos.id": id });

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

        return await queryBuilder.then(result => result[0]);
    }
}
