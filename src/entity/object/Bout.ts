import { Basho } from "./Basho";
import { JSONSchema, Model } from "objection";
import { Rikishi } from "./rikishi/Rikishi";
import { BaseObjectType } from "./BaseObjectType";
import { Kimarite } from "../../constant/Kimarite";
import { Field, ObjectType, Int, GraphQLISODateTime } from "type-graphql";
import { GraphQLString } from "graphql";

@ObjectType({ description: "The Bout model" })
export class Bout extends BaseObjectType {

    static get tableName() {
        return "bouts";
    }

    winnerId!: number;
    loserId!: number;
    bashoId!: number;

    @Field(() => GraphQLISODateTime)
    date!: string;

    @Field(() => Int)
    bashoDay!: number;

    @Field(() => Int)
    order!: number;

    @Field(() => Basho)
    basho!: Basho;

    @Field(() => Rikishi)
    winner!: Rikishi;

    @Field(() => Rikishi)
    loser!: Rikishi;

    @Field(() => GraphQLString)
    winningMethod!: Kimarite;

    @Field(() => Int)
    duration!: number;

    static get jsonSchema(): JSONSchema {
        return {
            type: "object",
            required: [
                "date",
                "bashoDay",
                "order",
                "winningMethod",
                "duration",
                "winnerId",
                "loserId",
                "bashoId"
            ],
            properties: {
                id: { type: "integer" },
                date: { type: "string", "format": "date-time" },
                bashoDay: {
                    type: "integer",
                    minimum: 1,
                    maximum: 15
                },
                order: {
                    type: "integer",
                    minimum: 1
                },
                winningMethod: {
                    type: "string",
                    enum: Object.values(Kimarite)
                },
                duration: {
                    type: "integer",
                    minimum: 1
                },
                winnerId: { type: "integer" },
                loserId: { type: "integer" },
                bashoId: { type: "integer" },
            }
        };
    }

    static get relationMappings() {
        return {
            winner: {
                relation: Model.HasOneRelation,
                modelClass: Rikishi,
                join: {
                    from: "bouts.winnerId",
                    to: "rikishis.id"
                }
            },
            loser: {
                relation: Model.HasOneRelation,
                modelClass: Rikishi,
                join: {
                    from: "bouts.loserId",
                    to: "rikishis.id"
                }
            }
        };
    }
}
