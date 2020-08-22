import { Resolvers } from "../resolver/Resolvers";
import { buildSchemaSync } from "type-graphql";
import { GraphQLSchema } from "graphql";
import { Container } from "typedi";

export const Schema: GraphQLSchema = buildSchemaSync({
    resolvers: Resolvers,
    container: Container
});

