import { PartialModelObject } from "objection";
import { BaseObjectType } from "../../entity/object/BaseObjectType";

export interface Repository<T extends BaseObjectType> {
    create(item: PartialModelObject<T>): Promise<T>
    find(id: number): Promise<T>
    update(item: PartialModelObject<T>): Promise<T>
    delete(id: number): Promise<boolean>
}
