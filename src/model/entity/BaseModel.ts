import { Model } from "objection";
import { Field, Int, ObjectType } from "type-graphql";

@ObjectType()
export class BaseModel extends Model {
    @Field(() => Int)
    id!: number;
}
