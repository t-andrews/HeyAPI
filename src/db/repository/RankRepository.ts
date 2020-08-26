import { Repository } from "./Repository";
import { Rank } from "../../entity/rikishi/Rank";
import { QueryBuilder } from "knex";
import { Inject, Service } from "typedi";
import { PostgresClient } from "../PostgresClient";
import { RankRowMapper } from "../mapper/RankRowMapper";

@Service()
export class RankRepository implements Repository<Rank> {

    @Inject() private rankRowMapper!: RankRowMapper;
    @Inject() private postgresClient!: PostgresClient;

    async create(item: Rank): Promise<boolean> {
        return undefined!;
    }

    async delete(id: number): Promise<boolean> {
        return undefined!;
    }

    async find(id: number): Promise<Rank> {
        const queryBuilder: QueryBuilder = this.postgresClient.queryTable("ranks")
            .where({ "id": id });

        return this.rankRowMapper.map((await queryBuilder)[0]);
    }

    async update(id: number, item: Rank): Promise<boolean> {
        return undefined!;
    }

}
