import * as Knex from "knex";

export async function seed(knex: Knex): Promise<void> {
    return knex.raw(`
        CREATE TEMPORARY TABLE banzuke_staging (
            basho VARCHAR,
            id INTEGER,
            rank VARCHAR,
            rikishi VARCHAR,
            heya VARCHAR,
            shusshin VARCHAR,
            birth_date DATE,
            height DECIMAL,
            weight DECIMAL,
            prev VARCHAR,
            prev_w INTEGER,
            prev_l INTEGER
        );
        
        CREATE TEMPORARY TABLE results_staging (
            basho VARCHAR,
            day INTEGER,
            rikishi1_id INTEGER,
            rikishi1_rank VARCHAR,
            rikishi1_shikona VARCHAR,
            rikishi1_result VARCHAR,
            rikishi1_win INTEGER,
            kimarite VARCHAR,
            rikishi2_id INTEGER,
            rikishi2_rank VARCHAR,
            rikishi2_shikona VARCHAR,
            rikishi2_result VARCHAR,
            rikishi2_win INTEGER
        );
        
        COPY banzuke_staging FROM '${process.cwd()}\\knex\\seeds\\banzuke.csv' with delimiter ',' CSV HEADER;
        COPY results_staging FROM '${process.cwd()}\\knex\\seeds\\results.csv' with delimiter ',' CSV HEADER;
        
        INSERT INTO rikishis(id,shusshin,birth_date)
        SELECT DISTINCT ON (id) id,shusshin,birth_date FROM banzuke_staging;
        
        INSERT INTO shikonas(rikishi_id,shikona)
        SELECT DISTINCT ON (id,rikishi) id,rikishi FROM banzuke_staging;
        
        INSERT INTO bashos(basho)
        SELECT DISTINCT basho FROM banzuke_staging;
        
        INSERT INTO bouts(basho_id,day,winning_method,winner_id,loser_id)
        SELECT 
            bashos.id,
            results_staging.day,
            INITCAP(results_staging.kimarite),
            CASE WHEN results_staging.rikishi1_win = 1 THEN results_staging.rikishi1_id ELSE results_staging.rikishi2_id END,
            CASE WHEN results_staging.rikishi1_win = 1 THEN results_staging.rikishi2_id ELSE results_staging.rikishi1_id END
        FROM results_staging
        INNER JOIN bashos ON (results_staging.basho = bashos.basho);
        
        INSERT INTO banzuke(rikishi_id,basho_id,heya,rank,weight,height)
        SELECT 
            banzuke_staging.id,
            bashos.id,
            banzuke_staging.heya,
            banzuke_staging.rank,
            banzuke_staging.weight,
            banzuke_staging.height
        FROM banzuke_staging
        INNER JOIN bashos ON (banzuke_staging.basho = bashos.basho);
        
        DROP TABLE banzuke_staging;
        DROP TABLE results_staging;
        `
    ).catch(err => {
        console.error("Seeding failed: ", err);
    });
}
