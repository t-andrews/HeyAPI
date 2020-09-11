import { Service } from "typedi";
import { BaseModel } from "../model/BaseModel";
import { ModelFieldValidator } from "../db/validator/ModelFieldValidator";
import { PartialModelObject, QueryBuilder, ValidationError } from "objection";

@Service()
export class GenericCRUDRepositoryUtil {

    public async create<T extends BaseModel> (item: PartialModelObject<T>, queryBuilder: QueryBuilder<T>): Promise<T> {
        return queryBuilder.insert(item);
    }

    public async find<T extends BaseModel> (id: number, queryBuilder: QueryBuilder<T>): Promise<T> {
        return queryBuilder.findById(id);
    }

    public async update<T extends BaseModel> (item: PartialModelObject<T>, queryBuilder: QueryBuilder<T>): Promise<T> {
        const validItem: boolean = ModelFieldValidator.validateUpdateItem(item, queryBuilder.modelClass().jsonSchema);

        if (!validItem) {
            throw new ValidationError({ type: "ModelValidation", message: "No valid field was supplied for the update" });
        }

        const id: number = (<Partial<BaseModel>>item).id!;

        return queryBuilder.patchAndFetchById(id , item);
    }

    public async delete<T extends BaseModel> (id: number, queryBuilder: QueryBuilder<T>): Promise<boolean> {
        return queryBuilder
            .deleteById(id)
            .then(result => {
                return result > 0 && result === id;
            });
    }
}
