import { Bout } from "./Bout";
import { Banzuke } from "./Banzuke";
import { Shikona } from "./Shikona";
import { GraphQLString } from "graphql";
import { BaseModel } from "./BaseModel";
import { JSONSchema, Model } from "objection";
import { Field, ObjectType } from "type-graphql";

@ObjectType({ description: "The Rikishi model" })
export class Rikishi extends BaseModel {

    static get tableName() {
        return "rikishis";
    }

    @Field(() => GraphQLString)
    shusshin!: string;

    @Field(() => GraphQLString)
    birthDate!: string;

    @Field(() => [Shikona], { nullable: true })
    shikonas?: Shikona[];

    @Field(() => [Banzuke], { nullable: true })
    banzukes?: Banzuke[];

    @Field(() => [Bout], { nullable: true })
    wins?: Bout[];

    @Field(() => [Bout], { nullable: true })
    losses?: Bout[];

    @Field(() => [Bout], { nullable: true })
    bouts?: Bout[];

    @Field(() => GraphQLString, { nullable: true })
    pictureUrl?: string;

    static get jsonSchema(): JSONSchema {
        return {
            type: "object",
            required: [
                "shusshin",
                "birthDate"
            ],
            properties: {
                id: { type: "integer" },
                shusshin: { type: "string" },
                birthDate: { type: "string", "format": "date" },
                pictureUrl: { type: "string" }
            }
        };
    }

    static get relationMappings() {
        return {
            banzukes: {
                relation: Model.HasManyRelation,
                modelClass: Banzuke,
                join: {
                    from: "rikishis.id",
                    to: "banzuke.rikishiId"
                }
            },
            wins: {
                relation: Model.HasManyRelation,
                modelClass: Bout,
                join: {
                    from: "rikishis.id",
                    to: "bouts.winnerId"
                }
            },
            losses: {
                relation: Model.HasManyRelation,
                modelClass: Bout,
                join: {
                    from: "rikishis.id",
                    to: "bouts.loserId"
                }
            },
            shikonas: {
                relation: Model.HasManyRelation,
                modelClass: Shikona,
                join: {
                    from: "rikishis.id",
                    to: "shikonas.rikishiId"
                }
            }
        };
    }
}
