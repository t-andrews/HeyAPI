import { Bout } from "../../object/Bout";
import { Kimarite } from "../../../../constant/Kimarite";
import { Field, GraphQLISODateTime, InputType, Int } from "type-graphql";

@InputType()
export class CreateBoutInput implements Partial<Bout> {
    @Field(type => GraphQLISODateTime)
    date!: Date;

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

    @Field()
    winningMethod!: Kimarite;

    @Field(() => Int)
    duration!: number;
}
