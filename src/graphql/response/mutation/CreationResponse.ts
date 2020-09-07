import { ObjectType } from "type-graphql";
import { MutationResponse } from "./MutationResponse";
import { BaseObjectType } from "../../../entity/object/BaseObjectType";

@ObjectType()
export abstract class CreationResponse extends MutationResponse {
    abstract data?: BaseObjectType | BaseObjectType[]
}
