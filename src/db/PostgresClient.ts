import { Service } from "typedi";
import Knex, { QueryBuilder, Raw } from "knex";
import config from "config";

@Service()
export class PostgresClient {
    private readonly db: Knex;

    constructor() {
        this.db = Knex({
            client: "postgres",
            connection: {
                host: config.get("knex.host"),
                port: config.get("knex.port"),
                user: config.get("knex.user"),
                password: config.get("knex.password"),
                database: config.get("knex.database")
            },
            debug: config.get("knex.debug")
        })
    }

    queryTable(tableName: string): QueryBuilder {
        return this.db(tableName);
    }

    raw(rawSql: string): Raw {
        return this.db.raw(rawSql);
    }
}
