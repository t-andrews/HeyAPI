import { Service } from "typedi";
import { Repository } from "./Repository";
import { PartialModelObject } from "objection";
import { Heya } from "../../entity/object/rikishi/Heya";
import { GenericCRUDRepositoryUtil } from "../../util/GenericCRUDRepositoryUtil";

@Service()
export class HeyaRepository implements Repository<Heya> {

    constructor(private repositoryUtil: GenericCRUDRepositoryUtil) {}

    public async create(item: PartialModelObject<Heya>): Promise<number> {
        return await this.repositoryUtil.create(item, Heya.query())
    }

    public async find(id: number): Promise<Heya> {
        return await this.repositoryUtil.find(id, Heya.query())
    }

    public async update(id: number, item: PartialModelObject<Heya>): Promise<boolean> {
        return await this.repositoryUtil.update(id, item, Heya.query())
    }

    public async delete(id: number): Promise<boolean> {
        return await this.repositoryUtil.delete(id, Heya.query())
    }
}
