import { GraphQLString } from "graphql";
import { Shikona } from "../../../model/entity/Shikona";
import { ArgsType, Field, InputType, Int } from "type-graphql";

@ArgsType()
@InputType()
export class AddShikonaInput implements Partial<Shikona> {
    @Field(() => Int)
    rikishiId!: number;

    @Field(() => GraphQLString)
    shikona!: string;
}
