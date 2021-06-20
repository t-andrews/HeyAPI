import { GraphQLString } from "graphql";
import { Basho } from "../../../model/Basho";
import { Matches, Min } from "class-validator";
import { Field, InputType, Int } from "type-graphql";
import { ValidationPattern } from "../../../constant/validation/ValidationPattern";

@InputType()
export class CreateBashoInput implements Partial<Basho> {

    @Matches(ValidationPattern.BASHO)
    @Field(() => GraphQLString)
    basho!: string;

    @Min(1)
    @Field(() => Int, { nullable: true })
    winnerId?: number;
}
