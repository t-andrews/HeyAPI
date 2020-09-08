import * as Knex from "knex";

export async function seed(knex: Knex): Promise<void> {
    return knex("bouts").insert([
        { bashoDay: 5, order: 1, duration: 55, winningMethod: "Nagete", winnerId: 1, loserId: 3, bashoId: 1, date: "2020-08-07 15:10:25"},
        { bashoDay: 4, order: 2, duration: 12, winningMethod: "Kihonwaza", winnerId: 2, loserId: 3, bashoId: 1, date: "2020-08-06 15:10:25"},
        { bashoDay: 3, order: 3, duration: 11, winningMethod: "Nagete", winnerId: 3, loserId: 5, bashoId: 1, date: "2020-08-05 15:10:25"},
        { bashoDay: 2, order: 4, duration: 61, winningMethod: "Kihonwaza", winnerId: 5, loserId: 4, bashoId: 1, date: "2020-08-04 15:10:25"},
        { bashoDay: 1, order: 5, duration: 29, winningMethod: "Nagete", winnerId: 4, loserId: 2, bashoId: 1, date: "2020-08-03 15:10:25"},
        { bashoDay: 5, order: 1, duration: 55, winningMethod: "Kihonwaza", winnerId: 1, loserId: 2, bashoId: 2, date: "2020-10-07 15:10:25"},
        { bashoDay: 4, order: 2, duration: 12, winningMethod: "Nagete", winnerId: 2, loserId: 4, bashoId: 2, date: "2020-10-06 15:10:25"},
        { bashoDay: 3, order: 3, duration: 11, winningMethod: "Kihonwaza", winnerId: 1, loserId: 5, bashoId: 2, date: "2020-10-05 15:10:25"},
        { bashoDay: 2, order: 4, duration: 61, winningMethod: "Nagete", winnerId: 5, loserId: 4, bashoId: 2, date: "2020-10-04 15:10:25"},
        { bashoDay: 1, order: 5, duration: 29, winningMethod: "Kihonwaza", winnerId: 3, loserId: 4, bashoId: 2, date: "2020-10-03 15:10:25"}
    ]);
}
