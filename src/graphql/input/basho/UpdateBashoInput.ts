import { GraphQLString } from "graphql";
import { Basho } from "../../../entity/object/Basho";
import { HonBasho } from "../../../constant/HonBasho";
import { Field, GraphQLISODateTime, InputType, Int } from "type-graphql";

@InputType()
export class UpdateBashoInput implements Partial<Basho>{
    @Field(() => GraphQLString, { nullable: true })
    name?: HonBasho;

    @Field(() => GraphQLString, { nullable: true })
    location?: string;

    @Field(() => Int, { nullable: true })
    winnerId?: number;

    @Field(() => GraphQLISODateTime, { nullable: true })
    startDate?: string;

    @Field(() => GraphQLISODateTime, { nullable: true })
    endDate?: string;
}
