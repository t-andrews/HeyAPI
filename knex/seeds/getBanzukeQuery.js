export default function getBanzukeQuery() {
    return `
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
        
        COPY banzuke_staging FROM '${process.cwd()}\\knex\\seeds\\banzuke.csv' with delimiter ',' CSV HEADER;
        
        INSERT INTO rikishis(name,shusshin,birth_date)
        SELECT DISTINCT ON (id,rikishi) rikishi,shusshin,birth_date FROM banzuke_staging ORDER BY birth_date
        
        INSERT INTO bashos()
        
        DROP TABLE banzuke_staging
    `;
}
