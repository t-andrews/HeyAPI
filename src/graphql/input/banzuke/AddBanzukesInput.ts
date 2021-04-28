import { ArgsType, Field } from "type-graphql";
import { AddBanzukeInput } from "./AddBanzukeInput";

@ArgsType()
export class AddBanzukesInput {
    @Field(() => [AddBanzukeInput])
    banzukes!: AddBanzukeInput[]
}
