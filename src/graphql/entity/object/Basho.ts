import { Bout } from "./Bout";
import { BaseObjectType } from "./BaseObjectType";
import { Rikishi } from "./rikishi/Rikishi";
import { HonBasho } from "../../../constant/HonBasho";
import { Field, GraphQLISODateTime, ObjectType } from "type-graphql";

@ObjectType({ description: "The Basho model" })
export class Basho extends BaseObjectType {

    winnerId!: number;

    @Field()
    name!: HonBasho;

    @Field(type => [Bout])
    bouts!: Bout[];

    @Field()
    location!: string;

    @Field(type => Rikishi, { nullable: true })
    winner?: Rikishi;

    @Field(type => GraphQLISODateTime)
    startDate!: Date;

    @Field(type => GraphQLISODateTime, { nullable: true })
    endDate?: Date;
}
