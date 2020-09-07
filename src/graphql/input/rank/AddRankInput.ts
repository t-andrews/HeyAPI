import { ArrayMinSize } from "class-validator";
import { ArgsType, Field, Int } from "type-graphql";
import { CreateRankInput } from "./CreateRankInput";

@ArgsType()
export class AddRankInput {
    @Field(() => Int, { nullable: false})
    rikishiId!: number;

    @ArrayMinSize(1)
    @Field(() => [CreateRankInput], { nullable: false })
    ranks!: CreateRankInput[];
}
