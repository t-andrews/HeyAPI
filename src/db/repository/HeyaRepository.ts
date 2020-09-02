import { Service } from "typedi";
import { PartialModelObject } from "objection";
import { AbstractRepository } from "./AbstractRepository";
import { Heya } from "../../graphql/entity/object/rikishi/Heya";
import { DatabaseException } from "../../graphql/entity/object/exception/db/DatabaseException";

@Service()
export class HeyaRepository extends AbstractRepository<Heya> {

    public async create(item: PartialModelObject<Heya>): Promise<number> {
        try {
            return await this.doCreate(item, Heya.query())
        } catch (e) {
            throw new DatabaseException((e as Error).message);
        }
    }

    public async find(id: number): Promise<Heya> {
        return await this.doFind(id, Heya.query())
    }

    public async update(id: number, item: Heya): Promise<boolean> {
        return await this.doUpdate(id, item, Heya.query())
    }

    public async delete(id: number): Promise<boolean> {
        try {
            return await this.doDelete(id, Heya.query())
        } catch {
            return false;
        }
    }

}
