import { Field, GraphQLISODateTime, ObjectType } from "type-graphql";
import { BashoDay } from "./BashoDay";
import { Rikishi } from "../rikishi/Rikishi";
import { BaseModel } from "../BaseModel";
import { HonBasho } from "../../constant/HonBasho";

@ObjectType({ description: "The Basho model" })
export class Basho extends BaseModel {

    @Field()
    name!: HonBasho;

    @Field(type => [BashoDay]!)
    days!: BashoDay[];

    @Field()
    location!: string;

    @Field(type => Rikishi)
    winner!: Rikishi;

    @Field(type => GraphQLISODateTime)
    startDate!: Date;

    @Field(type => GraphQLISODateTime)
    endDate!: Date;
}
