import { Bout } from "./Bout";
import { Model } from "objection";
import { Rikishi } from "./rikishi/Rikishi";
import { BaseObjectType } from "./BaseObjectType";
import { HonBasho } from "../../../constant/HonBasho";
import { Field, GraphQLISODateTime, ObjectType } from "type-graphql";

@ObjectType({ description: "The Basho model" })
export class Basho extends BaseObjectType {

    static get tableName() {
        return "bashos";
    }

    winnerId!: number;

    @Field()
    name!: HonBasho;

    @Field(() => [Bout])
    bouts!: Bout[];

    @Field()
    location!: string;

    @Field(() => Rikishi, { nullable: true })
    winner?: Rikishi;

    @Field(() => GraphQLISODateTime)
    startDate!: Date;

    @Field(() => GraphQLISODateTime, { nullable: true })
    endDate?: Date;

    static get relationMappings() {
        return {
            winner: {
                relation: Model.HasOneRelation,
                modelClass: Rikishi,
                join: {
                    from: "bashos.winnerId",
                    to: "rikishis.id"
                }
            },
            bouts: {
                relation: Model.HasManyRelation,
                modelClass: Bout,
                join: {
                    from: "bashos.id",
                    to: "bouts.bashoId"
                }
            }
        };
    }
}
