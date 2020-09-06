import { Service } from "typedi";
import { BaseObjectType } from "../entity/object/BaseObjectType";
import { ModelFieldValidator } from "../db/validator/ModelFieldValidator";
import { PartialModelObject, QueryBuilder, ValidationError } from "objection";

@Service()
export class GenericCRUDRepositoryUtil {

    public async create<T extends BaseObjectType> (item: PartialModelObject<T>, queryBuilder: QueryBuilder<T>): Promise<number> {
        return queryBuilder.insert(item).then(result => result.id);
    }

    public async find<T extends BaseObjectType> (id: number, queryBuilder: QueryBuilder<T>): Promise<T> {
        return queryBuilder.findById(id);
    }

    public async update<T extends BaseObjectType> (item: PartialModelObject<T>, queryBuilder: QueryBuilder<T>): Promise<boolean> {
        const validItem: boolean = ModelFieldValidator.validateUpdateItem(item, queryBuilder.modelClass().jsonSchema);

        if (!validItem) {
            throw new ValidationError({ type: "ModelValidation", message: "No valid field was supplied for the update" });
        }

        const id: number = (<Partial<BaseObjectType>>item).id!;

        return queryBuilder
            .patchAndFetchById(id , item)
            .then(result => result.id != undefined && result.id === id);
    }

    public async delete<T extends BaseObjectType> (id: number, queryBuilder: QueryBuilder<T>): Promise<boolean> {
        return queryBuilder
            .deleteById(id)
            .then(result => {
                return result > 0 && result === id;
            });
    }
}
