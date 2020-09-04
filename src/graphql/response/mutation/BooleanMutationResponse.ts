import { Field, ObjectType } from "type-graphql";
import { MutationResponse } from "./MutationResponse";

@ObjectType()
export class BooleanMutationResponse extends MutationResponse {
    @Field(() => Boolean, { nullable: true })
    success?: boolean
}
