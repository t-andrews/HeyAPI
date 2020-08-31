import { Field, Int, ObjectType } from "type-graphql";

@ObjectType()
export class BaseObjectType {

    @Field(type => Int)
    id!: number;
}
