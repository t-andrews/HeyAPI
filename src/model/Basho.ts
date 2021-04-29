import { Bout } from "./Bout";
import { Rikishi } from "./Rikishi";
import { BaseModel } from "./BaseModel";
import { GraphQLString } from "graphql";
import { JSONSchema, Model } from "objection";
import { Field, ObjectType } from "type-graphql";

@ObjectType({ description: "The Basho model" })
export class Basho extends BaseModel {

    static get tableName() {
        return "bashos";
    }

    winnerId!: number;

    @Field(() => GraphQLString)
    basho!: string;

    @Field(() => GraphQLString)
    location!: string;

    @Field(() => [Bout])
    bouts!: Bout[];

    @Field(() => Rikishi, { nullable: true })
    winner?: Rikishi;

    static get jsonSchema(): JSONSchema {
        return {
            type: "object",
            required: [
                "basho",
                "location",
                "winnerId"
            ],
            properties: {
                id: { type: "integer" },
                basho: { type: "string" },
                location: { type: "string" },
                winnerId: { type: "integer" },
            }
        };
    }

    static get relationMappings() {
        return {
            winner: {
                relation: Model.HasOneRelation,
                modelClass: Rikishi,
                join: {
                    from: "bashos.winnerId",
                    to: "rikishis.id"
                }
            },
            bouts: {
                relation: Model.HasManyRelation,
                modelClass: Bout,
                join: {
                    from: "bashos.id",
                    to: "bouts.bashoId"
                }
            }
        };
    }
}
