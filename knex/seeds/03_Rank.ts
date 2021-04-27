import * as Knex from "knex";

export async function seed(knex: Knex): Promise<void> {
    return knex("ranks").insert([
        { division: "Makuushi", region: "w", makuuchiRank: "Maegashira", position: 4, rikishi_id: 1},
        { division: "Makuushi", region: "e", makuuchiRank: "Yokozuna", position: 1, rikishi_id: 2},
        { division: "Juryo", region: "e", position: 7, rikishi_id: 3},
        { division: "Juryo", region: "w", position: 9, rikishi_id: 4},
        { division: "Makushita", region: "e", position: 2, rikishi_id: 5}
    ]);
}
