import { Min } from "class-validator";
import { Basho } from "../../../model/Basho";
import { Field, InputType, Int } from "type-graphql";

@InputType()
export class AddBashoWinnerInput implements Partial<Basho> {

    @Min(1)
    @Field(() => Int)
    id!: number;

    @Min(1)
    @Field(() => Int, { nullable: true })
    winnerId?: number;
}
