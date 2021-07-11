import { Min } from "class-validator";
import { Field, InputType, Int } from "type-graphql";

@InputType()
export class FindResultInput {

    @Field(() => Int)
    bashoId!: number;

    @Field(() => Int)
    rikishiId!: number;

    @Min(1)
    @Field(() => Int, { nullable: true })
    day?: number;
}
