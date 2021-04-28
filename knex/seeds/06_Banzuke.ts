import * as Knex from "knex";

export async function seed(knex: Knex): Promise<void> {
    return knex("banzuke").insert([
        { rikishiId: 5, bashoId: 1, rank: "Y1e", weight: 182, height: 175}
    ]);
}
