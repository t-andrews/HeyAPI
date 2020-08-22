import { Field, ObjectType, GraphQLISODateTime } from "type-graphql";
import { BaseModel } from "../BaseModel";

@ObjectType({ description: "The Heya model" })
export class Heya extends BaseModel {

    @Field()
    name!: string;

    @Field()
    ichimon!: string;

    @Field(type => GraphQLISODateTime)
    creationDate!: Date;

    @Field()
    location!: string;
}
