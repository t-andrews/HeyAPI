import { BaseModel } from "./BaseModel";
import { JSONSchema } from "objection";
import { Field, ObjectType } from "type-graphql";
import { GraphQLString } from "graphql";

@ObjectType({ description: "The Rank model" })
export class Rank extends BaseModel {

    static get tableName() {
        return "ranks";
    }

    @Field(() => GraphQLString)
    rank!: string;

    static get jsonSchema(): JSONSchema {
        return {
            type: "object",
            required: [
                "rank",
            ],
            properties: {
                rank: { type: "string" },
            }
        };
    }
}
