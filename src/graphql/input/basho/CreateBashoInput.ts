import { Basho } from "../../../entity/object/Basho";
import { HonBasho } from "../../../constant/HonBasho";
import { Field, GraphQLISODateTime, InputType, Int } from "type-graphql";
import { GraphQLString } from "graphql";

@InputType()
export class CreateBashoInput implements Partial<Basho>{
    @Field(() => GraphQLString)
    name!: HonBasho;

    @Field(() => GraphQLString)
    location!: string;

    @Field(() => Int, { nullable: true })
    winnerId?: number;

    @Field(() => GraphQLISODateTime)
    startDate!: string;

    @Field(() => GraphQLISODateTime, { nullable: true })
    endDate?: string;
}
