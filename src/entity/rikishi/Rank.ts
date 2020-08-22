import { Field, GraphQLISODateTime, Int, ObjectType } from "type-graphql";
import { Division } from "../../constant/Division";
import { MakuuchiRank } from "../../constant/MakuuchiRank";
import { Region } from "../../constant/Region";
import { BaseModel } from "../BaseModel";

@ObjectType({ description: "The Rank model" })
export class Rank extends BaseModel {

    @Field()
    division!: Division;

    @Field(type => Int)
    position?: number;

    @Field({ nullable: true })
    makuuchiRank?: MakuuchiRank;

    @Field({ nullable: true })
    region?: Region;

    @Field(type => GraphQLISODateTime)
    startDate!: Date;

    @Field(type => GraphQLISODateTime, { nullable: true })
    endDate?: Date;
}
