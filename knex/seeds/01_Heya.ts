import * as Knex from "knex";

export async function seed(knex: Knex): Promise<void> {
    return knex("heyas").insert([
        { name: "Heya Name 1", location: "Osaka", ichimon: "Group 1", creationDate: "1960-03-06 15:10:25"},
        { name: "Heya Name 2", location: "Tokyo", ichimon: "Group 2", creationDate: "1981-09-15 15:10:25"}
    ]);
}
