import { Heya } from "./Heya";
import { Rank } from "./Rank";
import { Bout } from "../Bout";
import { BaseObjectType } from "../BaseObjectType";
import { Field, GraphQLISODateTime, ObjectType } from "type-graphql";
import { Model } from "objection";

@ObjectType({ description: "The Rikishi model" })
export class Rikishi extends BaseObjectType {

    static get tableName() {
        return "rikishis";
    }

    rankId!: number;
    heyaId!: number;

    @Field()
    name!: string;

    @Field(() => GraphQLISODateTime)
    birthDate!: Date;

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
