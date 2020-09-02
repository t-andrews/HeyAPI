import { Service } from "typedi";
import { PartialModelObject } from "objection";
import { AbstractRepository } from "./AbstractRepository";
import { Rank } from "../../graphql/entity/object/rikishi/Rank";
import { DatabaseException } from "../../graphql/entity/object/exception/db/DatabaseException";

@Service()
export class RankRepository extends AbstractRepository<Rank> {

    public async create(item: PartialModelObject<Rank>): Promise<number> {
        try {
            return await this.doCreate(item, Rank.query())
        } catch (e) {
            throw new DatabaseException((e as Error).message);
        }
    }

    public async find(id: number): Promise<Rank> {
        return await this.doFind(id, Rank.query())
    }

    public async update(id: number, item: Rank): Promise<boolean> {
        return await this.doUpdate(id, item, Rank.query())
    }

    public async delete(id: number): Promise<boolean> {
        try {
            return await this.doDelete(id, Rank.query())
        } catch {
            return false;
        }
    }

}
