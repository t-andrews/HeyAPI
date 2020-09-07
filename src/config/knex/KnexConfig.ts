import { KnexConnectionConfig } from "./KnexConnectionConfig";
import { KnexMigrationsConfig } from "./KnexMigrationsConfig";

export interface KnexConfig {
    client: string,
    connection: KnexConnectionConfig,
    migrations?: KnexMigrationsConfig
    debut: boolean
}
