import { ArgsType, Field, Int } from "type-graphql";
import { Banzuke } from "../../../model/Banzuke";
import { CreateRankInput } from "../rank/CreateRankInput";

@ArgsType()
export class AddBanzukeInput implements Partial<Banzuke> {
    @Field(() => Int)
    rikishiId!: number;

    @Field(() => Int)
    bashoId!: number;

    @Field(() => Int, { nullable: true })
    rankId?: number;

    @Field(() => CreateRankInput, { nullable: true })
    newRank?: CreateRankInput;

    @Field(() => Int)
    weight!: number;

    @Field(() => Int)
    height!: number;
}
