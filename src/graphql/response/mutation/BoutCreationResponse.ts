import { Field, ObjectType } from "type-graphql";
import { Bout } from "../../../entity/object/Bout";
import { CreationResponse } from "./CreationResponse";

@ObjectType()
export class BoutCreationResponse extends CreationResponse {
    @Field(() => Bout, { nullable: true })
    data?: Bout
}
