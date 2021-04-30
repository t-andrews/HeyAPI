import { GraphQLString } from "graphql";
import { Basho } from "../../../model/Basho";
import { Matches, Min } from "class-validator";
import { Field, InputType, Int } from "type-graphql";

@InputType()
export class CreateBashoInput implements Partial<Basho> {

    @Matches(/^\d{4}\.(0[1-9]|1[012])$/)
    @Field(() => GraphQLString)
    basho!: string;

    @Min(1)
    @Field(() => Int, { nullable: true })
    winnerId?: number;
}
