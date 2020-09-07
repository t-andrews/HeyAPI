import { GraphQLString } from "graphql";
import { Basho } from "../../../entity/object/Basho";
import { Field, InputType, Int } from "type-graphql";
import { HonBasho } from "../../../constant/HonBasho";
import { IsDateString, IsIn, MaxLength, Min } from "class-validator";

@InputType()
export class UpdateBashoInput implements Partial<Basho> {
    @Min(1)
    @Field(() => Int)
    id!: number;

    @IsIn(Object.values(HonBasho))
    @Field(() => GraphQLString, { nullable: true })
    name?: HonBasho;

    @MaxLength(255)
    @Field(() => GraphQLString, { nullable: true })
    location?: string;

    @Min(1)
    @Field(() => Int, { nullable: true })
    winnerId?: number;

    @IsDateString()
    @Field(() => GraphQLString, { nullable: true })
    startDate?: string;

    @IsDateString()
    @Field(() => GraphQLString, { nullable: true })
    endDate?: string;
}
