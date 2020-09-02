import { Service } from "typedi";
import { PartialModelObject, QueryBuilder } from "objection";
import { Basho } from "../../graphql/entity/object/Basho";
import { DatabaseException } from "../../graphql/entity/object/exception/db/DatabaseException";
import { AbstractRepository } from "./AbstractRepository";
import { FieldNode } from "graphql";
import { Rikishi } from "../../graphql/entity/object/rikishi/Rikishi";
import { GraphQLNodeUtil } from "../../util/GraphQLNodeUtil";

@Service()
export class BashoRepository extends AbstractRepository<Basho> {

    public async create(item: PartialModelObject<Basho>): Promise<number> {
        try {
            return await this.doCreate(item, Basho.query())
        } catch (e) {
            throw new DatabaseException((e as Error).message);
        }
    }

    public async find(id: number): Promise<Basho> {
        return await this.doFind(id, Basho.query())
    }

    public async update(id: number, item: Basho): Promise<boolean> {
        return await this.doUpdate(id, item, Basho.query())
    }

    public async delete(id: number): Promise<boolean> {
        try {
            return await this.doDelete(id, Basho.query())
        } catch {
            return false;
        }
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
