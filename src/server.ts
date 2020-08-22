import "reflect-metadata";
import { Schema } from "./graphql/schema/Schema";
import { ApolloServer } from "apollo-server";

async function bootstrap() {

    const server = new ApolloServer({
        schema: Schema,
        playground: true,
        subscriptions: { path: "/graphql" },
    });

    const { url } = await server.listen(4000);
    console.log(`Server is running, GraphQL Playground available at ${url}`);
}

bootstrap();
