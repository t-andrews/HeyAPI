import { Bout } from "../../../model/Bout";
import { Max, Min } from "class-validator";
import { Field, InputType, Int } from "type-graphql";
import { Kimarite } from "../../../constant/kimarite/Kimarite";

@InputType()
export class CreateBoutInput implements Partial<Bout> {

    @Field(() => Int)
    bashoId!: number;

    @Min(1)
    @Max(16)
    @Field(() => Int)
    day!: number;

    @Field(() => Int)
    winnerId!: number;

    @Field(() => Int)
    loserId!: number;

    @Field(() => Kimarite)
    winningMethod!: Kimarite;
}
