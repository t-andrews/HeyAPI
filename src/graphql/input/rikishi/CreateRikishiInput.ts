import { GraphQLString } from "graphql";
import { Field, InputType, Int } from "type-graphql";
import { Rikishi } from "../../../model/rikishi/Rikishi";
import { IsDateString, IsUrl, MaxLength } from "class-validator";

@InputType()
export class CreateRikishiInput implements Partial<Rikishi> {
    @MaxLength(255)
    @Field(() => GraphQLString)
    name!: string;

    @IsDateString()
    @Field(() => GraphQLString)
    birthDate!: string;

    @MaxLength(32)
    @Field(() => GraphQLString)
    shusshin!: string;

    @Field(() => Int, { nullable: true })
    heyaId?: number;

    @IsUrl()
    @Field(() => String, { nullable: true })
    pictureUrl?: string;
}
