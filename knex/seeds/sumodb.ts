import * as Knex from "knex";

export async function seed(knex: Knex): Promise<void> {

    knex("rikishis").insert([
        { name: "Rikishi Name 1", birthDate: "1991-01-03 15:10:25", rankId: 1, heyaId: 1},
        { name: "Rikishi Name 2", birthDate: "1992-01-03 15:10:25", rankId: 2, heyaId: 2},
        { name: "Rikishi Name 3", birthDate: "1993-01-03 15:10:25", rankId: 3, heyaId: 1},
        { name: "Rikishi Name 4", birthDate: "1994-01-03 15:10:25", rankId: 4, heyaId: 2},
        { name: "Rikishi Name 5", birthDate: "1995-01-03 15:10:25", rankId: 5, heyaId: 1}
    ]);

    knex("ranks").insert([
        { division: "Makuushi", makuuchiRank: "Maegashira", position: 4, startDate: "2020-09-01 15:10:25", rikishi_id: 1},
        { division: "Makuushi", makuuchiRank: "Yokozuna", startDate: "2020-08-02 15:10:25", rikishi_id: 2},
        { division: "Juryo", region: "EAST", position: 7, startDate: "2020-07-03 15:10:25", rikishi_id: 3},
        { division: "Juryo", region: "WEST", position: 9, startDate: "2020-06-03 15:10:25", rikishi_id: 4},
        { division: "Makushita", position: 2, startDate: "2020-05-03 15:10:25", rikishi_id: 5}
    ]);

    knex("heyas").insert([
        { name: "Heya Name 1", location: "Osaka", ichimon: "Group 1", creationDate: "1960-03-06 15:10:25"},
        { name: "Heya Name 2", location: "Tokyo", ichimon: "Group 2", creationDate: "1981-09-15 15:10:25"}
    ]);

    knex("bouts").insert([
        { bashoDay: 5, order: 1, duration: 55, winnerId: 1, loserId: 3, bashoId: 1, date: "2020-08-07 15:10:25"},
        { bashoDay: 4, order: 2, duration: 12, winnerId: 2, loserId: 3, bashoId: 1, date: "2020-08-06 15:10:25"},
        { bashoDay: 3, order: 3, duration: 11, winnerId: 3, loserId: 5, bashoId: 1, date: "2020-08-05 15:10:25"},
        { bashoDay: 2, order: 4, duration: 61, winnerId: 5, loserId: 4, bashoId: 1, date: "2020-08-04 15:10:25"},
        { bashoDay: 1, order: 5, duration: 29, winnerId: 4, loserId: 2, bashoId: 1, date: "2020-08-03 15:10:25"},
        { bashoDay: 5, order: 1, duration: 55, winnerId: 1, loserId: 2, bashoId: 2, date: "2020-10-07 15:10:25"},
        { bashoDay: 4, order: 2, duration: 12, winnerId: 2, loserId: 4, bashoId: 2, date: "2020-10-06 15:10:25"},
        { bashoDay: 3, order: 3, duration: 11, winnerId: 1, loserId: 5, bashoId: 2, date: "2020-10-05 15:10:25"},
        { bashoDay: 2, order: 4, duration: 61, winnerId: 5, loserId: 4, bashoId: 2, date: "2020-10-04 15:10:25"},
        { bashoDay: 1, order: 5, duration: 29, winnerId: 3, loserId: 4, bashoId: 2, date: "2020-10-03 15:10:25"}
    ]);

    knex("bashos").insert([
        { name: "Natsu", location: "Kyoto", startDate: "2020-08-03 15:10:25", endDate: "2020-08-18 15:10:25", winnerId: 3},
        { name: "Nagoya", location: "Tokyo", startDate: "2020-10-03 15:10:25"}
    ]);
}
