import { JSONSchema } from "objection";
import { GraphQLString } from "graphql";
import { BaseModel } from "../BaseModel";
import { Field, ObjectType, GraphQLISODateTime } from "type-graphql";

@ObjectType({ description: "The Heya model" })
export class Heya extends BaseModel {

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
