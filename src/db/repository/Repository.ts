import { PartialModelObject } from "objection";
import { BaseModel } from "../../model/BaseModel";

export interface Repository<T extends BaseModel> {
    create(item: PartialModelObject<T>): Promise<T>
    find(id: number): Promise<T>
    update(item: PartialModelObject<T>): Promise<T>
    delete(id: number): Promise<boolean>
}
