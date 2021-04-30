import { ArgsType, Field, InputType, Int } from "type-graphql";
import { Banzuke } from "../../../model/Banzuke";
import { GraphQLString } from "graphql";

@ArgsType()
@InputType()
export class AddBanzukeInput implements Partial<Banzuke> {
    @Field(() => Int)
    rikishiId!: number;

    @Field(() => Int)
    bashoId!: number;

    @Field(() => GraphQLString)
    heya!: string;

    @Field(() => GraphQLString)
    rank!: string;

    @Field(() => Int)
    weight!: number;

    @Field(() => Int)
    height!: number;
}
