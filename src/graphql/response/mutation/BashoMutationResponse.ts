import { Field, ObjectType } from "type-graphql";
import { Basho } from "../../../model/Basho";
import { CreationResponse } from "./CreationResponse";

@ObjectType()
export class BashoMutationResponse extends CreationResponse {
    @Field(() => Basho, { nullable: true })
    data?: Basho
}
