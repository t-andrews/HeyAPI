import { Service } from "typedi";
import { PartialModelObject } from "objection";
import { Heya } from "../../entity/object/rikishi/Heya";
import { AbstractRepository } from "./AbstractRepository";

@Service()
export class HeyaRepository extends AbstractRepository<Heya> {

    public async create(item: PartialModelObject<Heya>): Promise<number> {
        return await this.doCreate(item, Heya.query())
    }

    public async find(id: number): Promise<Heya> {
        return await this.doFind(id, Heya.query())
    }

    public async update(id: number, item: PartialModelObject<Heya>): Promise<boolean> {
        return await this.doUpdate(id, item, Heya.query())
    }

    public async delete(id: number): Promise<boolean> {
        return await this.doDelete(id, Heya.query())
    }

}
