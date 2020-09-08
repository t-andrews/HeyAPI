import * as Knex from "knex";

export async function seed(knex: Knex): Promise<void> {
    return knex("ranks").insert([
        { division: "Makuushi", region: "West", makuuchiRank: "Maegashira", position: 4, startDate: "2020-09-01 15:10:25", rikishi_id: 1},
        { division: "Makuushi", region: "East", makuuchiRank: "Yokozuna", startDate: "2020-08-02 15:10:25", rikishi_id: 2},
        { division: "Juryo", region: "East", position: 7, startDate: "2020-07-03 15:10:25", rikishi_id: 3},
        { division: "Juryo", region: "West", position: 9, startDate: "2020-06-03 15:10:25", rikishi_id: 4},
        { division: "Makushita", region: "East", position: 2, startDate: "2020-05-03 15:10:25", rikishi_id: 5}
    ]);
}
