import { GraphQLString } from "graphql";
import { Rank } from "../../../model/rikishi/Rank";
import { Field, InputType, Int } from "type-graphql";
import { Rikishi } from "../../../model/rikishi/Rikishi";
import { CreateRankInput } from "../rank/CreateRankInput";
import { IsDateString, IsUrl, MaxLength } from "class-validator";

@InputType()
export class CreateRikishiInput implements Partial<Rikishi> {
    @MaxLength(255)
    @Field(() => GraphQLString)
    name!: string;

    @IsDateString()
    @Field(() => GraphQLString)
    birthDate!: string;

    @Field(() => Int, { nullable: true })
    heyaId?: number;

    @Field(() => [CreateRankInput], { nullable: true })
    ranks?: Rank[];

    @IsUrl()
    @Field(() => String, { nullable: true })
    pictureUrl?: string;
}
