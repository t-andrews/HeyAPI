import { Heya } from "./Heya";
import { Rank } from "./Rank";
import { Bout } from "../Bout";
import { Model } from "objection";
import { BaseObjectType } from "../BaseObjectType";
import { Field, GraphQLISODateTime, ObjectType } from "type-graphql";
import { GraphQLString } from "graphql";

@ObjectType({ description: "The Rikishi model" })
export class Rikishi extends BaseObjectType {

    static get tableName() {
        return "rikishis";
    }

    rankId!: number;
    heyaId!: number;

    @Field(() => GraphQLString)
    name!: string;

    @Field(() => GraphQLISODateTime)
    birthDate!: string;

    @Field(() => Heya)
    heya!: Heya;

    @Field(() => Rank)
    rank!: Rank;

    @Field(() => [Bout])
    wins!: Bout[];

    @Field(() => [Bout])
    losses!: Bout[];

    @Field(() => [Bout])
    bouts!: Bout[];

    static get jsonSchema() {
        return {
            type: "object",
            required: [
                "rankId",
                "heyaId",
                "name",
                "birthDate"
            ],
            properties: {
                id: { type: "integer" },
                rankId: { type: "integer" },
                heyaId: { type: "integer" },
                name: { type: "string" },
                birthDate: { type: "string", "format": "date-time" },
            }
        };
    }

    static get relationMappings() {
        return {
            rank: {
                relation: Model.HasOneRelation,
                modelClass: Rank,
                join: {
                    from: "rikishis.rankId",
                    to: "ranks.id"
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
