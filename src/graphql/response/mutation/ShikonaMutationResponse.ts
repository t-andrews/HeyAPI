import { Field, ObjectType } from "type-graphql";
import { Shikona } from "../../../model/entity/Shikona";
import { CreationResponse } from "./CreationResponse";

@ObjectType()
export class ShikonaMutationResponse extends CreationResponse {
    @Field(() => Shikona, { nullable: true })
    data?: Shikona
}
