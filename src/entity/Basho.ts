import { Field, GraphQLISODateTime, ObjectType } from "type-graphql";
import { Rikishi } from "./rikishi/Rikishi";
import { BaseModel } from "./BaseModel";
import { HonBasho } from "../constant/HonBasho";
import { Bout } from "./Bout";

@ObjectType({ description: "The Basho model" })
export class Basho extends BaseModel {

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

    @Field(type => GraphQLISODateTime)
    endDate!: Date;
}
