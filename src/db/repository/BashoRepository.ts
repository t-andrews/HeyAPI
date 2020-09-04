import { Service } from "typedi";
import { FieldNode } from "graphql";
import { Basho } from "../../entity/object/Basho";
import { AbstractRepository } from "./AbstractRepository";
import { GraphQLNodeUtil } from "../../util/GraphQLNodeUtil";
import { PartialModelObject, QueryBuilder } from "objection";


@Service()
export class BashoRepository extends AbstractRepository<Basho> {

    public async create(item: PartialModelObject<Basho>): Promise<number> {
        return await this.doCreate(item, Basho.query())
    }

    public async find(id: number): Promise<Basho> {
        return await this.doFind(id, Basho.query())
    }

    public async update(id: number, item: Basho): Promise<boolean> {
        return await this.doUpdate(id, item, Basho.query())
    }

    public async delete(id: number): Promise<boolean> {
        return await this.doDelete(id, Basho.query())
    }

    public async findDetailled(id: number, fieldNodes: ReadonlyArray<FieldNode>): Promise<Basho> {
        const queryBuilder: QueryBuilder<Basho> = Basho.query().where({ "bashos.id": id });

        const relationsToFetch: string[] = [];

        if(GraphQLNodeUtil.doesSelectionFieldExist(fieldNodes, fieldNodes[0].name.value, "bouts")) {
            relationsToFetch.push("bouts");
        }

        if(GraphQLNodeUtil.doesSelectionFieldExist(fieldNodes, fieldNodes[0].name.value, "winner")) {
            relationsToFetch.push("winner");
        }

        if (relationsToFetch.length > 0) {
            queryBuilder.withGraphJoined(`[${relationsToFetch.join(",")}]`);
        }

        return await queryBuilder.then(result => result[0]);
    }
}
