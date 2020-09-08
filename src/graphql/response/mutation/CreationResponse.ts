import { Field, ObjectType } from "type-graphql";
import { BaseObjectType } from "../../../entity/object/BaseObjectType";

@ObjectType()
export abstract class CreationResponse {
    abstract data?: BaseObjectType | BaseObjectType[]

    @Field({ nullable: true })
    error?: string
}
