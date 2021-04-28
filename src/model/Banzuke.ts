import { Basho } from "./Basho";
import { BaseModel } from "./BaseModel";
import { Rikishi } from "./rikishi/Rikishi";
import { JSONSchema, Model } from "objection";
import { Field, ObjectType, Int } from "type-graphql";

@ObjectType({ description: "The Banzuke model" })
export class Banzuke extends BaseModel {

    static get tableName() {
        return "banzuke";
    }

    rikishiId!: number;
    bashoId!: number;
    rank!: string;

    @Field(() => Basho)
    basho!: Basho;

    @Field(() => Rikishi)
    rikishi!: Rikishi;

    @Field(() => Int)
    weight!: number;

    @Field(() => Int)
    height!: number;

    static get jsonSchema(): JSONSchema {
        return {
            type: "object",
            required: [
                "rikishiId",
                "bashoId",
                "rank",
                "weight",
                "height"
            ],
            properties: {
                id: { type: "integer" },
                rikishiId: { type: "integer" },
                bashoId: { type: "integer" },
                rank: { type: "string" },
                weight: { type: "integer" },
                height: { type: "integer" }
            }
        };
    }

    static get relationMappings() {
        return {
            rikishi: {
                relation: Model.HasOneRelation,
                modelClass: Rikishi,
                join: {
                    from: "banzuke.rikishiId",
                    to: "rikishis.id"
                }
            },
            basho: {
                relation: Model.HasOneRelation,
                modelClass: Basho,
                join: {
                    from: "banzuke.bashoId",
                    to: "bashos.id"
                }
            }
        };
    }
}
