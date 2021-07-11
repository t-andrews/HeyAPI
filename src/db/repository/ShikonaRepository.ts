import { Service } from "typedi";
import { Repository } from "./Repository";
import { PartialModelObject } from "objection";
import { GenericCRUDRepositoryUtil } from "../../util/GenericCRUDRepositoryUtil";
import { Shikona } from "../../model/entity/Shikona";

@Service()
export class ShikonaRepository implements Repository<Shikona> {

    constructor(private repositoryUtil: GenericCRUDRepositoryUtil) {}

    public async create(item: PartialModelObject<Shikona>): Promise<Shikona> {
        return this.repositoryUtil.create(item, Shikona.query());
    }

    public async find(id: number): Promise<Shikona> {
        return this.repositoryUtil.find(id, Shikona.query());
    }

    public async update(item: Shikona): Promise<Shikona> {
        return this.repositoryUtil.update(item, Shikona.query());
    }

    public async delete(id: number): Promise<boolean> {
        return this.repositoryUtil.delete(id, Shikona.query());
    }

    public async createMany(Shikonas: PartialModelObject<Shikona>[]): Promise<Shikona[]> {
        return Shikona.query().insert(Shikonas);
    }

    public async findByRikishiId(id: number): Promise<Shikona[]> {
        return Shikona.query().where({ "rikishiId": id });
    }
}
