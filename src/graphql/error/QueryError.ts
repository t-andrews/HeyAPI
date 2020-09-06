import { GraphQLError } from "graphql";

export class QueryError extends GraphQLError {

    constructor(message: string) {
        super("Query Error: " + message);
    }
}
