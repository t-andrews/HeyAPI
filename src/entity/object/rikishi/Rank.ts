import { GraphQLString } from "graphql";
import { Region } from "../../../constant/Region";
import { BaseObjectType } from "../BaseObjectType";
import { Division } from "../../../constant/Division";
import { MakuuchiRank } from "../../../constant/MakuuchiRank";
import { Field, GraphQLISODateTime, Int, ObjectType } from "type-graphql";

@ObjectType({ description: "The Rank model" })
export class Rank extends BaseObjectType {

    static get tableName() {
        return "ranks";
    }

    @Field(() => GraphQLString)
    division!: Division;

    @Field(() => Int)
    position?: number;

    @Field(() => GraphQLString, { nullable: true })
    makuuchiRank?: MakuuchiRank;

    @Field(() => GraphQLString, { nullable: true })
    region?: Region;

    @Field(() => GraphQLISODateTime)
    startDate!: string;

    @Field(() => GraphQLISODateTime, { nullable: true })
    endDate?: string;

    static get jsonSchema() {
        return {
            type: "object",
            required: [
                "division",
                "startDate"
            ],
            properties: {
                id: { type: "integer" },
                division: {
                    type: "string",
                    enum: Object.values(Division)
                },
                makuuchiRank: {
                    type: "string",
                    enum: Object.values(MakuuchiRank)
                },
                region: {
                    type: "string",
                    enum: Object.values(Region)
                },
                position: {
                    type: "integer",
                    minimum: 1
                },
                startDate: { type: "string", "format": "date-time" },
                endDate: { type: "string", "format": "date-time" },
                rikishiId: { type: "integer" },
            }
        };
    }
}
