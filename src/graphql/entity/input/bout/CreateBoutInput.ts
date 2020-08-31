import { Bout } from "../../object/Bout";
import { Kimarite } from "../../../../constant/Kimarite";
import { Field, GraphQLISODateTime, InputType, Int } from "type-graphql";

@InputType()
export class CreateBoutInput implements Partial<Bout> {
    @Field(type => GraphQLISODateTime)
    date!: Date;

    @Field(type => Int)
    bashoId!: number;

    @Field(type => Int)
    bashoDay!: number;

    @Field(type => Int)
    order!: number;

    @Field(type => Int)
    opponentId1!: number;

    @Field(type => Int)
    opponentId2!: number;

    @Field(type => Int)
    winnerId!: number;

    @Field()
    winningMethod!: Kimarite;

    @Field(type => Int)
    duration!: number;
}
