import config from "config";
import { Service } from "typedi";
import Knex, { QueryBuilder, Raw } from "knex";

@Service()
export class PostgresClient {
    private readonly db: Knex;

    constructor() {
        this.db = Knex({
            client: "postgres",
            connection: config.get("knex.connection"),
            debug: config.get("knex.debug")
        })
    }

    queryTable(tableName: string): QueryBuilder {
        return this.db(tableName);
    }

    insert(object: Object): QueryBuilder {
        return this.db.insert(object);
    }


    raw(rawSql: string): Raw {
        return this.db.raw(rawSql);
    }
}
