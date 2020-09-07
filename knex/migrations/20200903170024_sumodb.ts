import Knex from "knex";
import config from "config";
import { KnexConfig } from "../../src/config/knex/KnexConfig";

const knexConfig: KnexConfig = config.get<KnexConfig>("knex");

export async function up(knex: Knex): Promise<void> {
    knex.raw(`CREATE DATABASE ${knexConfig.connection.database}`)
        .then(() => {
            knex.schema.createTable("rikishis", table => {
                table.increments("id").primary();
                table.string("name", 255).notNullable();
                table.timestamp("birth_date", { useTz: false }).notNullable();
                table.integer("heya_id").nullable();
            });
            knex.schema.createTable("ranks", table => {
                table.increments("id").primary();
                table.string("division", 32).notNullable();
                table.string("makuuchi_rank", 32).nullable();
                table.string("region", 8).notNullable();
                table.integer("position").nullable();
                table.timestamp("start_date", { useTz: false }).notNullable();
                table.timestamp("end_date", { useTz: false }).nullable();
                table.integer("rikishi_id").notNullable();
            });
            knex.schema.createTable("heyas", table => {
                table.increments("id").primary();
                table.string("name", 32).notNullable();
                table.timestamp("creation_date", { useTz: false }).notNullable();
                table.string("location", 255).notNullable();
                table.string("ichimon", 32).notNullable();
            });
            knex.schema.createTable("bouts", table => {
                table.increments("id").primary();
                table.timestamp("date", { useTz: false }).notNullable();
                table.integer("order").notNullable();
                table.integer("basho_day").notNullable();
                table.integer("duration").notNullable();
                table.string("winning_method", 32).notNullable();
                table.integer("winner_id").notNullable();
                table.integer("loser_id").notNullable();
                table.integer("basho_id").notNullable();
            });
            knex.schema.createTable("bashos", table => {
                table.increments("id").primary();
                table.string("name", 32).notNullable();
                table.string("location", 255).notNullable();
                table.integer("winner_id").nullable();
                table.timestamp("start_date", { useTz: false }).notNullable();
                table.timestamp("end_date", { useTz: false }).nullable();
            });
        });
}

export async function down(knex: Knex): Promise<void> {
    knex.schema.dropTable("rikishis");
    knex.schema.dropTable("ranks");
    knex.schema.dropTable("heyas");
    knex.schema.dropTable("bouts");
    knex.schema.dropTable("bashos");
}

