import { GraphQLString } from "graphql";
import { CreateRankInput } from "./CreateRankInput";
import { IsDateString, MaxLength } from "class-validator";
import { Rikishi } from "../../../entity/object/rikishi/Rikishi";
import { Field, InputType, Int } from "type-graphql";
import { Rank } from "../../../entity/object/rikishi/Rank";

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
}
