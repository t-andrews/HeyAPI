import { BaseObjectType } from "../BaseObjectType";
import { Field, ObjectType, GraphQLISODateTime } from "type-graphql";
import { GraphQLString } from "graphql";
import { JSONSchema } from "objection";

@ObjectType({ description: "The Heya model" })
export class Heya extends BaseObjectType {

    static get tableName() {
        return "heyas";
    }

    @Field(() => GraphQLString)
    name!: string;

    @Field(() => GraphQLString)
    ichimon!: string;

    @Field(() => GraphQLString)
    location!: string;

    @Field(() => GraphQLISODateTime)
    creationDate!: string;

    static get jsonSchema(): JSONSchema {
        return {
            type: "object",
            required: [
                "name",
                "location",
                "ichimon",
                "creationDate"
            ],
            properties: {
                id: { type: "integer" },
                name: { type: "string" },
                location: { type: "string" },
                ichimon: { type: "string" },
                creationDate: { type: "string", "format": "date-time" }
            }
        };
    }
}
