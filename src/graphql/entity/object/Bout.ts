import { Basho } from "./Basho";
import { BaseObjectType } from "./BaseObjectType";
import { Rikishi } from "./rikishi/Rikishi";
import { Kimarite } from "../../../constant/Kimarite";
import { Field, ObjectType, Int, GraphQLISODateTime } from "type-graphql";
import { Model } from "objection";

@ObjectType({ description: "The Bout model" })
export class Bout extends BaseObjectType {

    static get tableName() {
        return "bouts";
    }

    winnerId!: number;
    loserId!: number;
    bashoId!: number;

    @Field(() => GraphQLISODateTime)
    date!: Date;

    @Field(() => Int)
    bashoDay!: number;

    @Field(() => Int)
    order!: number;

    @Field(() => Basho)
    basho!: Basho;

    @Field(() => Rikishi)
    winner!: Rikishi;

    @Field(() => Rikishi)
    loser!: Rikishi;

    @Field()
    winningMethod!: Kimarite;

    @Field(() => Int)
    duration!: number;

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
