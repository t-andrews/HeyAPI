import Knex from "knex";

export async function up(knex: Knex): Promise<void> {
    return knex.schema
            .createTable("heyas", table => {
            table.increments("id").primary();
            table.string("name", 32).notNullable();
            table.timestamp("creation_date", { useTz: false }).notNullable();
            table.string("location", 255).notNullable();
            table.string("ichimon", 32).notNullable();
        })
        .createTable("rikishis", table => {
            table.increments("id").primary();
            table.string("name", 255).notNullable();
            table.string("shusshin", 255).notNullable();
            table.timestamp("birth_date", { useTz: false }).notNullable();
            table.integer("heya_id").nullable().references("id").inTable("heyas").onDelete("cascade");
            table.string("picture_url").nullable();
        })
        .createTable("bashos", table => {
            table.increments("id").primary();
            table.string("name", 32).notNullable();
            table.string("location", 255).notNullable();
            table.integer("winner_id").nullable().references("id").inTable("rikishis").onDelete("cascade");
            table.timestamp("start_date", { useTz: false }).notNullable();
            table.timestamp("end_date", { useTz: false }).nullable();
        })
        .createTable("bouts", table => {
            table.increments("id").primary();
            table.timestamp("date", { useTz: false }).notNullable();
            table.integer("order").notNullable();
            table.integer("basho_day").notNullable();
            table.integer("duration").notNullable();
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
            table.string("rank", 8).notNullable().references("rank").inTable("ranks");
            table.integer("weight").notNullable();
            table.integer("height").notNullable();
        });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema
        .dropTable("banzuke")
        .dropTable("ranks")
        .dropTable("bouts")
        .dropTable("bashos")
        .dropTable("rikishis")
        .dropTable("heyas");
}
