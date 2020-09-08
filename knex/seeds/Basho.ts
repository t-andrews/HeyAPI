import * as Knex from "knex";

export async function seed(knex: Knex): Promise<void> {
    return knex("bashos").insert([
        { name: "Natsu", location: "Kyoto", startDate: "2020-08-03 15:10:25", endDate: "2020-08-18 15:10:25", winnerId: 3},
        { name: "Nagoya", location: "Tokyo", startDate: "2020-10-03 15:10:25"}
    ]);
}
