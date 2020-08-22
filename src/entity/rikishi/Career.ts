import { Field, ObjectType } from "type-graphql";
import { Bout } from "../Bout";
import { Rank } from "./Rank";
import { BaseModel } from "../BaseModel";

@ObjectType({ description: "The Rikishi model" })
export class Career extends BaseModel {

    @Field(type => [Bout])
    bouts!: Bout[];

    @Field(type => Rank)
    highestRank!: Rank;
}
