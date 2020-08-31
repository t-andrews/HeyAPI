import { Basho } from "../../object/Basho";
import { HonBasho } from "../../../../constant/HonBasho";
import { Field, GraphQLISODateTime, InputType, Int } from "type-graphql";

@InputType()
export class UpdateBashoInput implements Partial<Basho>{
    @Field({ nullable: true })
    name?: HonBasho;

    @Field({ nullable: true })
    location?: string;

    @Field(type => Int, { nullable: true })
    winnerId?: number;

    @Field(type => GraphQLISODateTime, { nullable: true })
    startDate?: Date;

    @Field(type => GraphQLISODateTime, { nullable: true })
    endDate?: Date;
}
