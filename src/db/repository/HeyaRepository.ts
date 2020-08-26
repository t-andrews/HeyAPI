import { Repository } from "./Repository";
import { QueryBuilder } from "knex";
import { Inject, Service } from "typedi";
import { PostgresClient } from "../PostgresClient";
import { HeyaRowMapper } from "../mapper/HeyaRowMapper";
import { Heya } from "../../entity/rikishi/Heya";

@Service()
export class HeyaRepository implements Repository<Heya> {

    @Inject() private heyaRowMapper!: HeyaRowMapper;
    @Inject() private postgresClient!: PostgresClient;

    async create(item: Heya): Promise<boolean> {
        return undefined!;
    }

    async delete(id: number): Promise<boolean> {
        return undefined!;
    }

    async find(id: number): Promise<Heya> {
        const queryBuilder: QueryBuilder = this.postgresClient.queryTable("heyas")
            .where({ "id": id });

        return this.heyaRowMapper.map((await queryBuilder)[0]);
    }

    async update(id: number, item: Heya): Promise<boolean> {
        return undefined!;
    }

}
