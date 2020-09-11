import { Rikishi } from "./Rikishi";
import { GraphQLString } from "graphql";
import { BaseModel } from "../BaseModel";
import { JSONSchema, Model } from "objection";
import { Region } from "../../constant/Region";
import { Division } from "../../constant/Division";
import { MakuuchiRank } from "../../constant/MakuuchiRank";
import { Field, GraphQLISODateTime, Int, ObjectType } from "type-graphql";

@ObjectType({ description: "The Rank model" })
export class Rank extends BaseModel {

    static get tableName() {
        return "ranks";
    }

    rikishiId!: number;

    @Field(() => Division)
    division!: Division;

    @Field(() => Int, { nullable: true })
    position?: number;

    @Field(() => MakuuchiRank, { nullable: true })
    makuuchiRank?: MakuuchiRank;

    @Field(() => Region, { nullable: true })
    region?: Region;

    @Field(() => GraphQLISODateTime)
    startDate!: string;

    @Field(() => GraphQLISODateTime, { nullable: true })
    endDate?: string;

    static get jsonSchema(): JSONSchema {
        return {
            type: "object",
            required: [
                "division",
                "region",
                "startDate"
            ],
            properties: {
                id: { type: "integer" },
                division: {
                    type: "string",
                    enum: Object.values(Division)
                },
                makuuchiRank: {
                    type: "string",
                    enum: Object.values(MakuuchiRank)
                },
                region: {
                    type: "string",
                    enum: Object.values(Region)
                },
                position: {
                    type: "integer",
                    minimum: 1
                },
                startDate: { type: "string", "format": "date-time" },
                endDate: { type: "string", "format": "date-time" },
                rikishiId: { type: "integer" }
            }
        };
    }

    static get relationMappings() {
        return {
            rikishi: {
                relation: Model.HasOneRelation,
                modelClass: Rikishi,
                join: {
                    from: "rank.rikishiId",
                    to: "rikishis.id"
                }
            }
        };
    }
}
