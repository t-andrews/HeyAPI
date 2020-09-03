import { Service } from "typedi";
import { PartialModelObject } from "objection";
import { Bout } from "../../entity/object/Bout";
import { AbstractRepository } from "./AbstractRepository";

@Service()
export class BoutRepository extends AbstractRepository<Bout> {

    public async create(item: PartialModelObject<Bout>): Promise<number> {
        return await this.doCreate(item, Bout.query());
    }

    public async find(id: number): Promise<Bout> {
        return await this.doFind(id, Bout.query());
    }

    public async update(id: number, item: Bout): Promise<boolean> {
        return await this.doUpdate(id, item, Bout.query());
    }

    public async delete(id: number): Promise<boolean> {
        return await this.doDelete(id, Bout.query());
    }

    public async createMany(bouts: Bout[]): Promise<number[]> {
        const createdBouts: Bout[] = await Bout.query().insert(bouts)
            .returning("id")
            .then(result => result);

        return createdBouts.map(bout => bout.id);
    }

    public async findByRikishiId(id: number): Promise<Bout[]> {
        return await Bout.query()
            .where({ "winnerId": id }).orWhere({ "loserId": id })
            .then(result => result);
    }

    public async findByBashoId(id: number): Promise<Bout[]> {
        return await Bout.query()
            .where({ "basho_id": id })
            .then(result => result);
    }
}
