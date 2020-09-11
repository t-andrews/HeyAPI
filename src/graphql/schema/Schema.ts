import "reflect-metadata";
import { Container } from "typedi";
import { GraphQLSchema } from "graphql";
import { buildSchemaSync, registerEnumType } from "type-graphql";
import { Resolvers } from "../resolver/Resolvers";
import { Kimarite } from "../../constant/kimarite/Kimarite";
import { HonBasho } from "../../constant/HonBasho";
import { Division } from "../../constant/Division";
import { MakuuchiRank } from "../../constant/MakuuchiRank";
import { Region } from "../../constant/Region";

registerEnumType(
    Kimarite,
    {
        name: "Kimarite",
        description: "The bout winning methods"
    });

registerEnumType(
    HonBasho,
    {
        name: "HonBasho",
        description: "The basho names"
    });

registerEnumType(
    Division,
    {
        name: "Division",
        description: "The rikishi divisions"
    });

registerEnumType(
    MakuuchiRank,
    {
        name: "MakuuchiRank",
        description: "The makuuchi division ranks"
    });

registerEnumType(
    Region,
    {
        name: "Region",
        description: "The regions for ranks"
    });

export const Schema: GraphQLSchema = buildSchemaSync({
    resolvers: Resolvers,
    container: Container
});
