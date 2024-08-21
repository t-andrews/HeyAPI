import "ts-node/register";
import config from "config";
import { knexSnakeCaseMappers } from "objection";
import { KnexConfig } from "./src/config/knex/KnexConfig";

module.exports = ({
    ...structuredClone(config.get<KnexConfig>("knex")),
    ...knexSnakeCaseMappers()
})
