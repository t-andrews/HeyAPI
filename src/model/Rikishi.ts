import { Bout } from "./Bout";
import { Banzuke } from "./Banzuke";
import { GraphQLString } from "graphql";
import { BaseModel } from "./BaseModel";
import { JSONSchema, Model } from "objection";
import { Field, GraphQLISODateTime, ObjectType } from "type-graphql";

@ObjectType({ description: "The Rikishi model" })
export class Rikishi extends BaseModel {

    static get tableName() {
        return "rikishis";
    }

    @Field(() => GraphQLString)
    name!: string;

    @Field(() => GraphQLString)
    shusshin!: string;

    @Field(() => GraphQLISODateTime)
    birthDate!: string;

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
                "name",
                "shusshin",
                "birthDate"
            ],
            properties: {
                id: { type: "integer" },
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
