import { Field, Int, ObjectType } from "type-graphql";
import { MutationResponse } from "./MutationResponse";

@ObjectType()
export class IdMutationResponse extends MutationResponse {
    @Field(type => Int, { nullable: true })
    id?: number
}
