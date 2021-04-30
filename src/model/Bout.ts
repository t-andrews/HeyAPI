import { Basho } from "./Basho";
import { Rikishi } from "./Rikishi";
import { BaseModel } from "./BaseModel";
import { JSONSchema, Model } from "objection";
import { Field, ObjectType, Int } from "type-graphql";
import { Kimarite } from "../constant/kimarite/Kimarite";

@ObjectType({ description: "The Bout model" })
export class Bout extends BaseModel {

    static get tableName() {
        return "bouts";
    }

    winnerId!: number;
    loserId!: number;
    bashoId!: number;

    @Field(() => Int)
    day!: number;

    @Field(() => Basho)
    basho!: Basho;

    @Field(() => Rikishi)
    winner!: Rikishi;

    @Field(() => Rikishi)
    loser!: Rikishi;

    @Field(() => Kimarite)
    winningMethod!: Kimarite;

    static get jsonSchema(): JSONSchema {
        return {
            type: "object",
            required: [
                "day",
                "winningMethod",
                "winnerId",
                "loserId",
                "bashoId"
            ],
            properties: {
                id: { type: "integer" },
                day: {
                    type: "integer",
                    minimum: 1,
                    maximum: 15
                },
                winningMethod: {
                    type: "string",
                    enum: Object.values(Kimarite)
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
