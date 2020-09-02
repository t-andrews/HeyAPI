import { Model } from "objection";
import { Field, Int, ObjectType } from "type-graphql";

@ObjectType()
export class BaseObjectType extends Model {

    @Field(() => Int)
    id!: number;
}
