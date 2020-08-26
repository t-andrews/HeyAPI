import { Repository } from "./Repository";
import { QueryBuilder } from "knex";
import { Inject, Service } from "typedi";
import { PostgresClient } from "../PostgresClient";
import { BoutRowMapper } from "../mapper/BoutRowMapper";
import { Bout } from "../../entity/Bout";

@Service()
export class BoutRepository implements Repository<Bout> {

    @Inject() private boutRowMapper!: BoutRowMapper;
    @Inject() private postgresClient!: PostgresClient;

    async create(item: Bout): Promise<boolean> {
        return undefined!;
    }

    async delete(id: number): Promise<boolean> {
        return undefined!;
    }

    async find(id: number): Promise<Bout> {
        const queryBuilder: QueryBuilder = this.postgresClient.queryTable("bouts")
            .where({ "id": id });

        return this.boutRowMapper.map((await queryBuilder)[0]);
    }

    async findByRikishiId(id: number): Promise<Bout[]> {
        const queryBuilder: QueryBuilder = this.postgresClient.queryTable("bouts")
            .where({ "opponent_id_1": id }).orWhere({ "opponent_id_2": id });

        const queryResult = await queryBuilder;

        return queryResult.map(
            (row: any): Bout => this.boutRowMapper.map(row)
        );
    }

    async findByBashoId(id: number): Promise<Bout[]> {
        const queryBuilder: QueryBuilder = this.postgresClient.queryTable("bouts")
            .where({ "basho_id": id });

        const queryResult = await queryBuilder;

        return queryResult.map(
            (row: any): Bout => this.boutRowMapper.map(row)
        );
    }

    async update(id: number, item: Bout): Promise<boolean> {
        return undefined!;
    }

}
