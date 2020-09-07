import { GraphQLString } from "graphql";
import { Region } from "../../../constant/Region";
import { Field, InputType, Int } from "type-graphql";
import { Division } from "../../../constant/Division";
import { Rank } from "../../../entity/object/rikishi/Rank";
import { MakuuchiRank } from "../../../constant/MakuuchiRank";
import { IsDateString, IsIn, Max, Min } from "class-validator";

@InputType()
export class CreateRankInput implements Partial<Rank> {
    @IsIn(Object.values(Division))
    @Field(() => GraphQLString)
    division!: Division;

    @Min(1)
    @Max(16)
    @Field(() => Int, { nullable: true })
    position?: number;

    @IsIn(Object.values(MakuuchiRank))
    @Field(() => GraphQLString, { nullable: true })
    makuuchiRank?: MakuuchiRank;

    @IsIn(Object.values(Region))
    @Field(() => GraphQLString)
    region!: Region;

    @IsDateString()
    @Field(() => GraphQLString)
    startDate!: string;

    @IsDateString()
    @Field(() => GraphQLString, { nullable: true })
    endDate?: string;
}
