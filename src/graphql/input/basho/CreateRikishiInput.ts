import { GraphQLString } from "graphql";
import { Heya } from "../../../entity/object/rikishi/Heya";
import { Rank } from "../../../entity/object/rikishi/Rank";
import { Rikishi } from "../../../entity/object/rikishi/Rikishi";
import { Field, GraphQLISODateTime, InputType} from "type-graphql";
import { IsDateString, MaxLength } from "class-validator";

@InputType()
export class CreateRikishiInput implements Partial<Rikishi> {
    @MaxLength(255)
    @Field(() => GraphQLString)
    name!: string;

    @IsDateString()
    @Field(() => GraphQLISODateTime)
    birthDate!: string;

    @Field(() => Heya)
    heya?: Heya;

    @Field(() => Rank)
    rank?: Rank;
}
