import "reflect-metadata";
import { ApolloServer } from "apollo-server";
import { Schema } from "./graphql/schema/Schema";
import { PostgresClient } from "./db/PostgresClient";

async function bootstrap() {

    PostgresClient.initObjection();

    const server = new ApolloServer({
        schema: Schema,
        playground: true,
        subscriptions: { path: "/graphql" },
    });

    const { url } = await server.listen(4000);
    console.log(`Server is running, GraphQL Playground available at ${url}`);
}

bootstrap();
