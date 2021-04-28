import { ArgsType, Field, Int } from "type-graphql";
import { Banzuke } from "../../../model/Banzuke";

@ArgsType()
export class AddBanzukeInput implements Partial<Banzuke> {
    @Field(() => Int)
    rikishiId!: number;

    @Field(() => Int)
    bashoId!: number;

    @Field(() => Int)
    rank!: string;

    @Field(() => Int)
    weight!: number;

    @Field(() => Int)
    height!: number;
}
