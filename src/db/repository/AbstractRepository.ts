import { Repository } from "./Repository";
import { PartialModelObject, QueryBuilder } from "objection";
import { BaseObjectType } from "../../graphql/entity/object/BaseObjectType";
import { DatabaseException } from "../../graphql/entity/object/exception/db/DatabaseException";

export abstract class AbstractRepository<T extends BaseObjectType> implements Repository<T> {

    abstract create(item: PartialModelObject<T>): Promise<number>
    abstract find(id: number): Promise<T>
    abstract update(id: number, item: PartialModelObject<T>): Promise<boolean>
    abstract delete(id: number): Promise<boolean>

    protected async doCreate(item: PartialModelObject<T>, queryBuilder: QueryBuilder<T>): Promise<number> {
        try {
            return await queryBuilder.insert(item).then(result => result.id);
        } catch (e) {
            throw new DatabaseException((e as Error).message);
        }
    }

    protected async doFind(id: number, queryBuilder: QueryBuilder<T>): Promise<T> {
        return await queryBuilder
            .findById(id)
            .then(result => result);
    }

    protected async doUpdate(id: number, item: PartialModelObject<T>, queryBuilder: QueryBuilder<T>): Promise<boolean> {
        return await queryBuilder
            .findById(id)
            .patch(item)
            .returning("id")
            .then(result => result[0].id != undefined);
    }

    protected async doDelete(id: number, queryBuilder: QueryBuilder<T>): Promise<boolean> {
        try {
            return await queryBuilder
                .deleteById(id)
                .then(result => {
                    return result > 0;
                });
        } catch {
            return false;
        }
    }
}
