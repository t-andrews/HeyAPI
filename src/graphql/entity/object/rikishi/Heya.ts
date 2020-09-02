import { BaseObjectType } from "../BaseObjectType";
import { Field, ObjectType, GraphQLISODateTime } from "type-graphql";

@ObjectType({ description: "The Heya model" })
export class Heya extends BaseObjectType {

    static get tableName() {
        return "heyas";
    }

    @Field()
    name!: string;

    @Field()
    ichimon!: string;

    @Field(() => GraphQLISODateTime)
    creationDate!: Date;

    @Field()
    location!: string;
}
