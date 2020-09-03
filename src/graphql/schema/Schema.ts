import "reflect-metadata";
import { Container } from "typedi";
import { GraphQLSchema } from "graphql";
import { buildSchemaSync } from "type-graphql";
import { Resolvers } from "../resolver/Resolvers";

export const Schema: GraphQLSchema = buildSchemaSync({
    resolvers: Resolvers,
    container: Container
});

