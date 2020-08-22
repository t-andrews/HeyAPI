import { QueryBuilder } from "knex";

export interface HydrateResolver<T> {
    hydrate(queryResult: QueryBuilder): T[]
}
