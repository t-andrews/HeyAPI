import * as Knex from "knex";

export async function seed(knex: Knex): Promise<void> {
    return knex("rikishis").insert([
        { name: "Rikishi Name 1", birthDate: "1991-01-03 15:10:25", heyaId: 1},
        { name: "Rikishi Name 2", birthDate: "1992-01-03 15:10:25", heyaId: 2},
        { name: "Rikishi Name 3", birthDate: "1993-01-03 15:10:25", heyaId: 1},
        { name: "Rikishi Name 4", birthDate: "1994-01-03 15:10:25", heyaId: 2},
        { name: "Rikishi Name 5", birthDate: "1995-01-03 15:10:25", heyaId: 1}
    ]);
}
