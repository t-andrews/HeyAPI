import { Field, Int, ObjectType } from "type-graphql";

@ObjectType()
export class BaseModel {

    @Field(type => Int)
    id!: number;
}
