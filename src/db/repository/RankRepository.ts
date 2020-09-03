import { Service } from "typedi";
import { PartialModelObject } from "objection";
import { Rank } from "../../entity/object/rikishi/Rank";
import { AbstractRepository } from "./AbstractRepository";

@Service()
export class RankRepository extends AbstractRepository<Rank> {

    public async create(item: PartialModelObject<Rank>): Promise<number> {
        return await this.doCreate(item, Rank.query())
    }

    public async find(id: number): Promise<Rank> {
        return await this.doFind(id, Rank.query())
    }

    public async update(id: number, item: Rank): Promise<boolean> {
        return await this.doUpdate(id, item, Rank.query())
    }

    public async delete(id: number): Promise<boolean> {
        return await this.doDelete(id, Rank.query())
    }

}
