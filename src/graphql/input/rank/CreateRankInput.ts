import { GraphQLString } from "graphql";
import { Region } from "../../../constant/Region";
import { Rank } from "../../../model/rikishi/Rank";
import { Field, InputType, Int } from "type-graphql";
import { Division } from "../../../constant/Division";
import { MakuuchiRank } from "../../../constant/MakuuchiRank";
import { IsDateString, IsIn, Max, Min } from "class-validator";

@InputType()
export class CreateRankInput implements Partial<Rank> {
    @IsIn(Object.values(Division))
    @Field(() => Division)
    division!: Division;

    @Min(1)
    @Max(16)
    @Field(() => Int, { nullable: true })
    position!: number;

    @IsIn(Object.values(MakuuchiRank))
    @Field(() => MakuuchiRank, { nullable: true })
    makuuchiRank?: MakuuchiRank;

    @IsIn(Object.values(Region))
    @Field(() => Region)
    region!: Region;
}
