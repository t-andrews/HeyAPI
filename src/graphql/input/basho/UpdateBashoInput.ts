import { GraphQLString } from "graphql";
import { Basho } from "../../../model/Basho";
import { Field, InputType, Int } from "type-graphql";
import { Matches, MaxLength, Min } from "class-validator";

@InputType()
export class UpdateBashoInput implements Partial<Basho> {

    @Min(1)
    @Field(() => Int)
    id!: number;

    @Matches(/^\d{4}\.(0[1-9]|1[012])$/)
    @Field(() => GraphQLString)
    basho!: string;

    @MaxLength(255)
    @Field(() => GraphQLString, { nullable: true })
    location?: string;

    @Min(1)
    @Field(() => Int, { nullable: true })
    winnerId?: number;
}
