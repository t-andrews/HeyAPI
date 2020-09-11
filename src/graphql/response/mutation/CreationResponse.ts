import { Field, ObjectType } from "type-graphql";
import { BaseModel } from "../../../model/BaseModel";

@ObjectType()
export abstract class CreationResponse {
    abstract data?: BaseModel | BaseModel[]

    @Field({ nullable: true })
    error?: string
}
