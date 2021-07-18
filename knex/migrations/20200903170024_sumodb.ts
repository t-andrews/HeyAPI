import Knex from "knex";

export async function up(knex: Knex): Promise<void> {
    return knex.schema
        .createTable("rikishis", table => {
            table.increments("id").primary();
            table.string("shusshin", 32).notNullable();
            table.date("birth_date").nullable();
            table.string("picture_url").nullable();
        })
        .createTable("shikonas", table => {
            table.increments("id").primary();
            table.integer("rikishi_id").references("id").inTable("rikishis").onDelete("cascade");
            table.string("shikona").nullable();
            table.unique(["rikishi_id", "shikona"]);
        })
        .createTable("bashos", table => {
            table.increments("id").primary();
            table.string("basho", 32).notNullable();
            table.integer("winner_id").nullable().references("id").inTable("rikishis").onDelete("cascade");
        })
        .createTable("bouts", table => {
            table.increments("id").primary();
            table.integer("day").notNullable();
            table.string("winning_method", 32).notNullable();
            table.integer("winner_id").notNullable().references("id").inTable("rikishis").onDelete("cascade");
            table.integer("loser_id").notNullable().references("id").inTable("rikishis").onDelete("cascade");
            table.integer("basho_id").notNullable().references("id").inTable("bashos").onDelete("cascade");
        })
        .createTable("ranks", table => {
            table.string("rank", 8).primary();
        })
        .createTable("banzuke", table => {
            table.increments("id").primary();
            table.integer("rikishi_id").notNullable().references("id").inTable("rikishis").onDelete("cascade");
            table.integer("basho_id").notNullable().references("id").inTable("bashos").onDelete("cascade");
            table.integer("shikona_id").notNullable().references("id").inTable("shikonas").onDelete("cascade");
            table.string("heya", 32).notNullable();
            table.string("rank", 8).notNullable().references("rank").inTable("ranks");
            table.integer("weight").nullable();
            table.integer("height").nullable();
            table.unique(["rikishi_id", "basho_id", "shikona_id"])
        })
        .raw('CREATE EXTENSION IF NOT EXISTS pg_trgm;');
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema
        .dropTable("banzuke")
        .dropTable("ranks")
        .dropTable("bouts")
        .dropTable("bashos")
        .dropTable("rikishis")
        .dropTable("heyas")
        .raw('drop extension pg_trgm;');
}
