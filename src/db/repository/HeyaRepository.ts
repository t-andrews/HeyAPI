import { Service } from "typedi";
import { Repository } from "./Repository";
import { PartialModelObject } from "objection";
import { Heya } from "../../model/rikishi/Heya";
import { GenericCRUDRepositoryUtil } from "../../util/GenericCRUDRepositoryUtil";

@Service()
export class HeyaRepository implements Repository<Heya> {

    constructor(private repositoryUtil: GenericCRUDRepositoryUtil) {}

    public async create(item: PartialModelObject<Heya>): Promise<Heya> {
        return this.repositoryUtil.create(item, Heya.query());
    }

    public async find(id: number): Promise<Heya> {
        return this.repositoryUtil.find(id, Heya.query());
    }

    public async update(item: PartialModelObject<Heya>): Promise<Heya> {
        return this.repositoryUtil.update(item, Heya.query());
    }

    public async delete(id: number): Promise<boolean> {
        return this.repositoryUtil.delete(id, Heya.query());
    }
}
