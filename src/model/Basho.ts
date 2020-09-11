import { Bout } from "./Bout";
import { BaseModel } from "./BaseModel";
import { GraphQLString } from "graphql";
import { Rikishi } from "./rikishi/Rikishi";
import { JSONSchema, Model } from "objection";
import { HonBasho } from "../constant/HonBasho";
import { Field, GraphQLISODateTime, ObjectType } from "type-graphql";

@ObjectType({ description: "The Basho model" })
export class Basho extends BaseModel {

    static get tableName() {
        return "bashos";
    }

    winnerId!: number;

    @Field(() => HonBasho)
    name!: HonBasho;

    @Field(() => GraphQLString)
    location!: string;

    @Field(() => [Bout])
    bouts!: Bout[];

    @Field(() => Rikishi, { nullable: true })
    winner?: Rikishi;

    @Field(() => GraphQLISODateTime)
    startDate!: string;

    @Field(() => GraphQLISODateTime, { nullable: true })
    endDate?: string;

    static get jsonSchema(): JSONSchema {
        return {
            type: "object",
            required: [
                "name",
                "location",
                "startDate",
                "winnerId"
            ],
            properties: {
                id: { type: "integer" },
                name: {
                    type: "string",
                    enum: Object.values(HonBasho)
                },
                location: { type: "string" },
                startDate: { type: "string", "format": "date-time" },
                endDate: { type: "string", "format": "date-time" },
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
