import { Inject, Service } from "typedi";
import { PostgresClient } from "../PostgresClient";
import { AbstractRowMapper } from "../mapper/row/AbstractRowMapper";
import { ModelMapper } from "../mapper/model/ModelMapper";
import { Repository } from "./Repository";
import { DatabaseException } from "../../graphql/entity/object/exception/db/DatabaseException";

@Service()
export abstract class AbstractRepository<T> implements Repository<T>{

    protected table: string;
    protected rowMapper: AbstractRowMapper<T>;
    protected modelMapper: ModelMapper<T, any>;
    @Inject() protected postgresClient!: PostgresClient

    protected constructor(
        table: string,
        rowMapper: AbstractRowMapper<T>,
        modelMapper: ModelMapper<T, any>

    ) {
        this.table = table;
        this.rowMapper = rowMapper;
        this.modelMapper = modelMapper;
    }

    async create(item: T): Promise<number> {
        try {
            return await this.postgresClient.insert(this.modelMapper.map(item))
                .returning("id")
                .into(this.table)
                .then(result => result[0]);
        } catch (e) {
            throw new DatabaseException((e as Error).message);
        }
    }

    async find(id: number): Promise<T> {
        const queryResult = await this.postgresClient.queryTable(this.table)
            .where({ "id": id })
            .then(result => result[0]);

        return this.rowMapper.map(queryResult);
    }

    abstract update(id: number, item: T): Promise<boolean>;

    async delete(id: number): Promise<boolean> {
        try {
            return await this.postgresClient.queryTable(this.table)
                .where({ "id": id })
                .delete()
                .then(result => {
                    return result > 0;
                });
        } catch {
            return false;
        }
    }
}
