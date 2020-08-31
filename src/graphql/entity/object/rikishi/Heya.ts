import { BaseObjectType } from "../BaseObjectType";
import { Field, ObjectType, GraphQLISODateTime } from "type-graphql";

@ObjectType({ description: "The Heya model" })
export class Heya extends BaseObjectType {

    @Field()
    name!: string;

    @Field()
    ichimon!: string;

    @Field(type => GraphQLISODateTime)
    creationDate!: Date;

    @Field()
    location!: string;
}
