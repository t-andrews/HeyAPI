import { Rikishi } from "./Rikishi";
import { BaseModel } from "../BaseModel";
import { JSONSchema, Model } from "objection";
import { Region } from "../../constant/Region";
import { Division } from "../../constant/Division";
import { MakuuchiRank } from "../../constant/MakuuchiRank";
import { Field, Int, ObjectType } from "type-graphql";

@ObjectType({ description: "The Rank model" })
export class Rank extends BaseModel {

    static get tableName() {
        return "ranks";
    }

    rikishiId!: number;

    @Field(() => Division)
    division!: Division;

    @Field(() => Int, { nullable: true })
    position!: number;

    @Field(() => MakuuchiRank, { nullable: true })
    makuuchiRank?: MakuuchiRank;

    @Field(() => Region, { nullable: true })
    region?: Region;

    static get jsonSchema(): JSONSchema {
        return {
            type: "object",
            required: [
                "division",
                "region",
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
                    from: "ranks.rikishiId",
                    to: "rikishis.id"
                }
            }
        };
    }
}
