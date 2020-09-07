import { Field, ObjectType } from "type-graphql";
import { Basho } from "../../../entity/object/Basho";
import { CreationResponse } from "./CreationResponse";

@ObjectType()
export class BashoCreationResponse extends CreationResponse {
    @Field(() => Basho, { nullable: true })
    data?: Basho
}
