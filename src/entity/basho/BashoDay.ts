import { Field, Int, ObjectType } from "type-graphql";
import { Bout } from "../Bout";
import { BaseModel } from "../BaseModel";

@ObjectType({ description: "The Basho Day model" })
export class BashoDay extends BaseModel {
    @Field(type => [Bout]!)
    bouts!: Bout[];

    @Field(type => Int)
    day!: number;
}
