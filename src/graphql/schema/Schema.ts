import "reflect-metadata";
import { Container } from "typedi";
import { GraphQLSchema } from "graphql";
import { Resolvers } from "../resolver/Resolvers";
import { buildSchemaSync } from "type-graphql";

export const Schema: GraphQLSchema = buildSchemaSync({
    resolvers: Resolvers,
    container: Container
});

