import { Field, Int, ObjectType } from "type-graphql";

@ObjectType()
export class BoutResult  {
    @Field(() => Int)
    wins!: number;

    @Field(() => Int)
    losses!: number;
}
