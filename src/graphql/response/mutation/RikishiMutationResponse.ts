import { Rikishi } from "../../../model/Rikishi";
import { Field, ObjectType } from "type-graphql";
import { CreationResponse } from "./CreationResponse";

@ObjectType()
export class RikishiMutationResponse extends CreationResponse {
    @Field(() => Rikishi, { nullable: true })
    data?: Rikishi
}
