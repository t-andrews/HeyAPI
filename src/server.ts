import "reflect-metadata";
import express from "express";
import { Schema } from "./graphql/schema/Schema";
import { ApolloServer } from "apollo-server-express";
import { PostgresClient } from "./db/PostgresClient";
import { ErrorFormatter } from "./graphql/error/ErrorFormatter";

async function bootstrap() {

    PostgresClient.initObjection();

    const server = new ApolloServer({
        schema: Schema,
        playground: true,
        formatError: err => ErrorFormatter.format(err)
    });

    const app = express();
    server.applyMiddleware({ app });

    app.get('/', (req, res) => {
        res.redirect('/graphql');
    });

    const port = process.env.PORT || 4000;

    app.listen(port, () => {
        if (process.env.NODE_ENV != "prod") {
            console.log(`Server is running, GraphQL Playground available on http://localhost:4000/graphql`);
        }
    });
}

bootstrap();
