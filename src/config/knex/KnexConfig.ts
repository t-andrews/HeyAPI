import { KnexConnectionConfig } from "./KnexConnectionConfig";
import { KnexMigrationsConfig } from "./KnexMigrationsConfig";

export interface KnexConfig {
    client: string,
    connection: KnexConnectionConfig | string,
    migrations?: KnexMigrationsConfig
    debug: boolean
}
