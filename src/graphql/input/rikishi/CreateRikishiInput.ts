import { GraphQLString } from "graphql";
import { Field, InputType } from "type-graphql";
import { Rikishi } from "../../../model/Rikishi";
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

    @IsUrl()
    @Field(() => String, { nullable: true })
    pictureUrl?: string;
}
