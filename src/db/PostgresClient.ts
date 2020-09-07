import Knex from "knex";
import config from "config";
import { KnexConfig } from "../config/knex/KnexConfig";
import { knexSnakeCaseMappers, Model } from "objection";

export class PostgresClient {
    public static initObjection(): Knex {
        const knex:Knex = Knex({
            ...config.get<KnexConfig>("knex"),
            ...knexSnakeCaseMappers()
        });
        Model.knex(knex);
        return knex;
    }
}
