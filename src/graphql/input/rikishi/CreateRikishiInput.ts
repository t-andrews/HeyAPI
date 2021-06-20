import { GraphQLString } from "graphql";
import { IsDate } from "../validation/IsDate";
import { Field, InputType } from "type-graphql";
import { Rikishi } from "../../../model/Rikishi";
import { IsNotEmpty, IsUrl, MaxLength } from "class-validator";

@InputType()
export class CreateRikishiInput implements Partial<Rikishi> {

    @IsDate()
    @Field(() => GraphQLString)
    birthDate!: string;

    @MaxLength(32)
    @Field(() => GraphQLString)
    shusshin!: string;

    @IsNotEmpty()
    @Field(() => GraphQLString)
    shikona!: string;

    @IsUrl()
    @Field(() => String, { nullable: true })
    pictureUrl?: string;
}
