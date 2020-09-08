import { Field, ObjectType } from "type-graphql";
import { CreationResponse } from "./CreationResponse";
import { Rank } from "../../../entity/object/rikishi/Rank";

@ObjectType()
export class RanksMutationResponse extends CreationResponse {
    @Field(() => [Rank], { nullable: true })
    data?: Rank[]
}
