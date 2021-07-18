import { Rikishi } from "./Rikishi";
import { BaseModel } from "./BaseModel";
import { GraphQLString } from "graphql";
import { JSONSchema, Model } from "objection";
import { Field, ObjectType } from "type-graphql";
import { Banzuke } from "./Banzuke";

@ObjectType({ description: "The Shikona model" })
export class Shikona extends BaseModel {

    static get tableName() {
        return "shikonas";
    }

    rikishiId!: number;

    @Field(() => GraphQLString)
    shikona!: string;

    @Field(() => Rikishi)
    rikishi!: Rikishi;

    static get jsonSchema(): JSONSchema {
        return {
            type: "object",
            required: [
                "rikishiId",
                "shikona"
            ],
            properties: {
                rikishiId: { type: "integer" },
                shikona: { type: "string" },
            }
        };
    }

    static get relationMappings() {
        return {
            rikishi: {
                relation: Model.HasOneRelation,
                modelClass: Rikishi,
                join: {
                    from: "shikonas.rikishiId",
                    to: "rikishis.id"
                }
            },
            banzukes: {
                relation: Model.HasManyRelation,
                modelClass: Banzuke,
                join: {
                    from: "shikonas.id",
                    to: "banzuke.shikonaId"
                }
            }
        };
    }
}
