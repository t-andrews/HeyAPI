import { Heya } from "./Heya";
import { Bout } from "../Bout";
import { GraphQLString } from "graphql";
import { BaseModel } from "../BaseModel";
import { JSONSchema, Model } from "objection";
import { Field, GraphQLISODateTime, ObjectType } from "type-graphql";
import { Banzuke } from "../Banzuke";

@ObjectType({ description: "The Rikishi model" })
export class Rikishi extends BaseModel {

    static get tableName() {
        return "rikishis";
    }

    heyaId!: number;

    @Field(() => GraphQLString)
    name!: string;

    @Field(() => GraphQLString)
    shusshin?: string;

    @Field(() => GraphQLISODateTime)
    birthDate!: string;

    @Field(() => Heya)
    heya!: Heya;

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
                "heyaId",
                "name",
                "shusshin",
                "birthDate"
            ],
            properties: {
                id: { type: "integer" },
                heyaId: { type: "integer" },
                name: { type: "string" },
                shusshin: { type: "string" },
                pictureUrl: { type: "string" },
                birthDate: { type: "string", "format": "date-time" },
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
            heya: {
                relation: Model.HasOneRelation,
                modelClass: Heya,
                join: {
                    from: "rikishis.heyaId",
                    to: "heyas.id"
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
            }
        };
    }
}
