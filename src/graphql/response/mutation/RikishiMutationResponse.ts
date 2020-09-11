import { Field, ObjectType } from "type-graphql";
import { CreationResponse } from "./CreationResponse";
import { Rikishi } from "../../../model/rikishi/Rikishi";

@ObjectType()
export class RikishiMutationResponse extends CreationResponse {
    @Field(() => Rikishi, { nullable: true })
    data?: Rikishi
}
