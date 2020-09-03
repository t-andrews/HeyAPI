import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class MutationResponse {
    @Field({ nullable: true })
    error?: string
}
