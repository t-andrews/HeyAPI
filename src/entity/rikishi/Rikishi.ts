import { Field, GraphQLISODateTime, Int, ObjectType } from "type-graphql";
import { Heya } from "./Heya";
import { Rank } from "./Rank";
import { BaseModel } from "../BaseModel";
import { Bout } from "../Bout";

@ObjectType({ description: "The Rikishi model" })
export class Rikishi extends BaseModel {

    rankId!: number;
    heyaId!: number;

    @Field()
    name!: string;

    @Field(type => GraphQLISODateTime)
    birthDate!: Date;

    @Field(type => Heya)
    heya!: Heya;

    @Field(type => Rank)
    rank!: Rank;

    @Field(type => [Bout])
    bouts!: Bout[];
}
