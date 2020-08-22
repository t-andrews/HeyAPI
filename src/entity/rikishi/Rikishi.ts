import { Field, GraphQLISODateTime, Int, ObjectType } from "type-graphql";
import { Heya } from "./Heya";
import { Rank } from "./Rank";
import { Career } from "./Career";
import { BaseModel } from "../BaseModel";

@ObjectType({ description: "The Rikishi model" })
export class Rikishi extends BaseModel {

    @Field()
    name!: string;

    @Field(type => GraphQLISODateTime)
    birthDate!: Date;

    @Field(type => Heya)
    heya!: Heya;

    @Field(type => Rank)
    rank!: Rank;

    // @Field(type => Career)
    // career!: Career;
}
