import { Basho } from "../../object/Basho";
import { HonBasho } from "../../../../constant/HonBasho";
import { Field, GraphQLISODateTime, InputType, Int } from "type-graphql";

@InputType()
export class CreateBashoInput implements Partial<Basho>{
    @Field()
    name!: HonBasho;

    @Field()
    location!: string;

    @Field(type => Int, { nullable: true })
    winnerId?: number;

    @Field(type => GraphQLISODateTime)
    startDate!: Date;

    @Field(type => GraphQLISODateTime, { nullable: true })
    endDate?: Date;
}
