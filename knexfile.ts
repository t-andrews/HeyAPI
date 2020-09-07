import "ts-node/register";
import config from "config";
import { KnexConfig } from "./src/config/knex/KnexConfig";

module.exports = config.get<KnexConfig>("knex");
