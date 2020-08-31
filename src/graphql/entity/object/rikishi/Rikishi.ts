import { Heya } from "./Heya";
import { Rank } from "./Rank";
import { Bout } from "../Bout";
import { BaseObjectType } from "../BaseObjectType";
import { Field, GraphQLISODateTime, ObjectType } from "type-graphql";

@ObjectType({ description: "The Rikishi model" })
export class Rikishi extends BaseObjectType {

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
