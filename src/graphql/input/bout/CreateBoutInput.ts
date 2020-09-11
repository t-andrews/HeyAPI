import { Bout } from "../../../model/Bout";
import { Kimarite } from "../../../constant/kimarite/Kimarite";
import { Field, GraphQLISODateTime, InputType, Int } from "type-graphql";

@InputType()
export class CreateBoutInput implements Partial<Bout> {
    @Field(() => GraphQLISODateTime)
    date!: string;

    @Field(() => Int)
    bashoId!: number;

    @Field(() => Int)
    bashoDay!: number;

    @Field(() => Int)
    order!: number;

    @Field(() => Int)
    winnerId!: number;

    @Field(() => Int)
    loserId!: number;

    @Field(() => Kimarite)
    winningMethod!: Kimarite;

    @Field(() => Int)
    duration!: number;
}
