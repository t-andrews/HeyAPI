import { Field, ObjectType } from "type-graphql";
import { CreationResponse } from "./CreationResponse";
import { Rikishi } from "../../../entity/object/rikishi/Rikishi";

@ObjectType()
export class RikishiCreationResponse extends CreationResponse {
    @Field(() => Rikishi, { nullable: true })
    data?: Rikishi
}
