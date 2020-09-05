import { Service } from "typedi";
import { Repository } from "./Repository";
import { PartialModelObject } from "objection";
import { Bout } from "../../entity/object/Bout";
import { GenericCRUDRepositoryUtil } from "../../util/GenericCRUDRepositoryUtil";

@Service()
export class BoutRepository implements Repository<Bout> {

    constructor(private repositoryUtil: GenericCRUDRepositoryUtil) {}

    public async create(item: PartialModelObject<Bout>): Promise<number> {
        return await this.repositoryUtil.create(item, Bout.query());
    }

    public async find(id: number): Promise<Bout> {
        return await this.repositoryUtil.find(id, Bout.query());
    }

    public async update(item: Bout): Promise<boolean> {
        return await this.repositoryUtil.update(item, Bout.query());
    }

    public async delete(id: number): Promise<boolean> {
        return await this.repositoryUtil.delete(id, Bout.query());
    }

    public async createMany(bouts: Bout[]): Promise<number[]> {
        const createdBouts: Bout[] = await Bout.query().insert(bouts);

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
