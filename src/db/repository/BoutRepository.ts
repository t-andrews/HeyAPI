import { Service } from "typedi";
import { Bout } from "../../graphql/entity/object/Bout";
import { AbstractRepository } from "./AbstractRepository";
import { BoutRowMapper } from "../mapper/row/BoutRowMapper";
import { BoutModelMapper } from "../mapper/model/BoutModelMapper";

@Service()
export class BoutRepository extends AbstractRepository<Bout> {

    constructor(
        boutModelMapper: BoutModelMapper,
        boutRowMapper: BoutRowMapper
    ) {
        super("bouts", boutRowMapper, boutModelMapper);
    }

    public async createMany(bouts: Bout[]): Promise<number[]> {
        const boutIds: number[] = [];

        await this.postgresClient.insert(
            bouts.map((bout: Bout) => this.modelMapper.map(bout))
        )
            .returning("id")
            .into(this.table)
            .then(result => {
                result.forEach(row => {
                    boutIds.push(row.id);
                });
            });

        return boutIds;
    }

    public async findByRikishiId(id: number): Promise<Bout[]> {
        const queryResult: any[] = await this.postgresClient.queryTable(this.table)
            .where({ "opponent_id_1": id }).orWhere({ "opponent_id_2": id })
            .then(result => result);

        return queryResult.map(
            (row: any): Bout => this.rowMapper.map(row)
        );
    }

    public async findByBashoId(id: number): Promise<Bout[]> {
        const queryResult: any[] = await this.postgresClient.queryTable(this.table)
            .where({ "basho_id": id })
            .then(result => result);

        return queryResult.map(
            (row: any): Bout => this.rowMapper.map(row)
        );
    }

    public async update(id: number, item: Bout): Promise<boolean> {
        return undefined!;
    }

}
