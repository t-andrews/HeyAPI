import { Field, ObjectType, Int, GraphQLISODateTime } from "type-graphql";
import { Rikishi } from "./rikishi/Rikishi";
import { Kimarite } from "../constant/Kimarite";
import { Basho } from "./basho/Basho";
import { BaseModel } from "./BaseModel";

@ObjectType({ description: "The Bout model" })
export class Bout extends BaseModel {

    @Field(type => GraphQLISODateTime)
    date!: Date;

    @Field(type => Int)
    day!: number;

    @Field(type => Int)
    order!: number;

    @Field(type => Basho)
    basho!: Basho;

    @Field(type => [Rikishi]!)
    opponents!: Rikishi[];

    @Field(type => Rikishi)
    winner!: Rikishi;

    @Field()
    winningMethod!: Kimarite;

    @Field(type => Int)
    duration!: number;
}
