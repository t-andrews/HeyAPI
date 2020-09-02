import Knex from "knex";
import config from "config";
import { knexSnakeCaseMappers, Model } from "objection";

export class PostgresClient {
    public static initObjection() {
        Model.knex(Knex({
            client: "postgres",
            connection: config.get("knex.connection"),
            debug: config.get("knex.debug"),
            ...knexSnakeCaseMappers()
        }));
    }
}
