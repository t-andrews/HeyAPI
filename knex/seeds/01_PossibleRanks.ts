import * as Knex from "knex";
import * as fs from "fs";

export async function seed(knex: Knex): Promise<void> {
        return knex("ranks").insert(fs.readFileSync(
            `${process.cwd()}\\knex\\seeds\\sumo-japan-possible-ranks.csv`,
            {encoding:'utf8', flag:'r'}
            ).split('\n').map(r => ({rank: r.trim()})).filter(r => !!r.rank)
        ).returning('*')
            .then(console.log)
            .catch(console.error);
}
