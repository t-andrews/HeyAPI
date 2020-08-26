import { Repository } from "./Repository";
import { QueryBuilder } from "knex";
import { Inject, Service } from "typedi";
import { PostgresClient } from "../PostgresClient";
import { BashoRowMapper } from "../mapper/BashoRowMapper";
import { Basho } from "../../entity/Basho";

@Service()
export class BashoRepository implements Repository<Basho> {

    @Inject() private bashoRowMapper!: BashoRowMapper;
    @Inject() private postgresClient!: PostgresClient;

    async create(item: Basho): Promise<boolean> {
        return undefined!;
    }

    async delete(id: number): Promise<boolean> {
        return undefined!;
    }

    async find(id: number): Promise<Basho> {
        const queryBuilder: QueryBuilder = this.postgresClient.queryTable("bashos")
            .where({ "id": id });

        return this.bashoRowMapper.map((await queryBuilder)[0]);
    }

    async update(id: number, item: Basho): Promise<boolean> {
        return undefined!;
    }

}
