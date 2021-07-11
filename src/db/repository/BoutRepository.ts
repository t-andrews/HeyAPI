import { Service } from "typedi";
import { Repository } from "./Repository";
import { PartialModelObject } from "objection";
import { Bout } from "../../model/entity/Bout";
import { GenericCRUDRepositoryUtil } from "../../util/GenericCRUDRepositoryUtil";

@Service()
export class BoutRepository implements Repository<Bout> {

    constructor(private repositoryUtil: GenericCRUDRepositoryUtil) {}

    public async create(item: PartialModelObject<Bout>): Promise<Bout> {
        return this.repositoryUtil.create(item, Bout.query());
    }

    public async find(id: number): Promise<Bout> {
        return this.repositoryUtil.find(id, Bout.query());
    }

    public async update(item: Bout): Promise<Bout> {
        return this.repositoryUtil.update(item, Bout.query());
    }

    public async delete(id: number): Promise<boolean> {
        return this.repositoryUtil.delete(id, Bout.query());
    }

    public async createMany(bouts: Bout[]): Promise<Bout[]> {
        return Bout.query().insert(bouts);
    }

    public async findByRikishiId(id: number): Promise<Bout[]> {
        return Bout.query()
            .where({ "winnerId": id })
            .orWhere({ "loserId": id });
    }

    public async findByBashoId(id: number): Promise<Bout[]> {
        return Bout.query()
            .where({ "basho_id": id });
    }
}
